// src/app/profile/payment/_hooks/usePaymentVerification.ts

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/src/shared/store/store";

interface VerificationResult {
  status: "success" | "unsuccess" | "unknown";
  order: any;
  payment: any;
  message?: string;
}

export function usePaymentVerification() {
  const router = useRouter();

  const verifyPayment = useCallback(
    async (orderId: number): Promise<VerificationResult | null> => {
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

        // ✅ درخواست بررسی وضعیت پرداخت
        const response = await fetch(`/api/protected/orders/${orderId}/verify`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          toast.error("نشست شما منقضی شده است");
          router.push("/auth/login");
          return null;
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ خطا در بررسی پرداخت:", errorText);
          return {
            status: "unknown",
            order: null,
            payment: null,
            message: "خطا در بررسی وضعیت پرداخت",
          };
        }

        const result = await response.json();

        // ✅ وضعیت واقعی پرداخت
        const paymentStatus = result.paymentStatus || result.status || 0;

        let status: "success" | "unsuccess" | "unknown";
        if (paymentStatus === 1) {
          status = "success";
          toast.success("✅ پرداخت شما با موفقیت انجام شد");
        } else if (paymentStatus === 2) {
          status = "unsuccess";
          toast.error("❌ پرداخت شما ناموفق بود");
        } else {
          status = "unknown";
          toast.error("⚠️ وضعیت پرداخت نامشخص است");
        }

        return {
          status,
          order: result.order,
          payment: result.payment,
          message: result.message,
        };
      } catch (error) {
        console.error("❌ خطا در بررسی پرداخت:", error);
        return {
          status: "unknown",
          order: null,
          payment: null,
          message: error instanceof Error ? error.message : "خطای ناشناخته",
        };
      }
    },
    [router]
  );

  return { verifyPayment };
}