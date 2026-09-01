// src/app/profile/payment/_hooks/usePaymentProcess.ts

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/src/shared/store/store";

interface PaymentProcessParams {
  orderId: number;
  amount: number;
  paymentMethod: "pasargad" | "saman";
}

export function usePaymentProcess() {
  const router = useRouter();

  const processPayment = useCallback(
    async (params: PaymentProcessParams) => {
      try {
        // ✅ دریافت توکن
        let token = localStorage.getItem("accessToken");
        if (!token) {
          const storeToken = useAuthStore.getState().accessToken;
          if (storeToken) {
            token = storeToken;
            localStorage.setItem("accessToken", token);
          }
        }

        if (!token) {
          toast.error("لطفاً دوباره وارد حساب کاربری خود شوید");
          router.push("/auth/login");
          return null;
        }

        // ✅ ارسال درخواست پرداخت
        const response = await fetch("/api/protected/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderId: params.orderId,
            amount: params.amount,
            paymentMethod: params.paymentMethod,
            status: 0, // در انتظار پرداخت
            transactionCode: `PAY-${params.orderId}-${Date.now()}`,
            paidAt: null,
          }),
        });

        // ✅ مدیریت خطای 401
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          toast.error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید");
          router.push("/auth/login");
          return null;
        }

        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = "خطا در پرداخت";
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorJson.error || errorMessage;
          } catch {
            errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const result = await response.json();

        // ✅ استخراج رکورد پرداخت ساخته‌شده (فرمت پاسخ ممکنه { data: {...} } یا مستقیم {...} باشه)
        const paymentRecord = result?.data?.data || result?.data || result;
        const paymentId: number | undefined = paymentRecord?.id;

        if (!paymentId) {
          console.warn("⚠️ paymentId از پاسخ ساخت پرداخت پیدا نشد:", result);
        }

        // ✅ دریافت URL درگاه پرداخت
        const paymentUrl =
          result.paymentUrl ||
          result.paymentLink ||
          result.redirectUrl ||
          result.url ||
          result.data?.paymentUrl;

        return {
          success: true,
          paymentUrl,
          paymentId,
          data: result,
        };
      } catch (error) {
        console.error("❌ خطا در پرداخت:", error);
        toast.error(error instanceof Error ? error.message : "خطا در پرداخت");
        return {
          success: false,
          error: error instanceof Error ? error.message : "خطای ناشناخته",
        };
      }
    },
    [router]
  );

  return { processPayment };
}