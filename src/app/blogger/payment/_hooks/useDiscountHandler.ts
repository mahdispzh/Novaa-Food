// src/app/profile/payment/_hooks/useDiscountHandler.ts

"use client";

import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

interface DiscountState {
  code: string;
  amount: number;
  error: string | null;
  isOpen: boolean;
}

export function useDiscountHandler(basePrice: number) {
  const [discount, setDiscount] = useState<DiscountState>({
    code: "",
    amount: 0,
    error: null,
    isOpen: false,
  });

  const applyDiscount = useCallback(
    async (code: string) => {
      const trimmedCode = code.trim();
      
      if (!trimmedCode) {
        setDiscount((prev) => ({
          ...prev,
          error: "لطفاً کد تخفیف را وارد کنید",
        }));
        return false;
      }

      try {
        // ✅ اعتبارسنجی کد تخفیف از API
        const response = await fetch("/api/discount/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: trimmedCode,
            total: basePrice,
          }),
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || "کد تخفیف نامعتبر است");
        }

        const data = await response.json();
        const discountAmount = data.discountAmount || data.amount || 0;

        setDiscount({
          code: trimmedCode,
          amount: discountAmount,
          error: null,
          isOpen: false,
        });

        toast.success(`✅ تخفیف ${discountAmount.toLocaleString()} تومان اعمال شد`);
        return true;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "خطا در اعمال تخفیف";
        setDiscount((prev) => ({
          ...prev,
          error: errorMessage,
        }));
        toast.error(errorMessage);
        return false;
      }
    },
    [basePrice]
  );

  const toggleDiscount = useCallback(() => {
    setDiscount((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      error: prev.isOpen ? null : prev.error,
    }));
  }, []);

  const resetDiscount = useCallback(() => {
    setDiscount({
      code: "",
      amount: 0,
      error: null,
      isOpen: false,
    });
  }, []);

  const setDiscountCode = useCallback((code: string) => {
    setDiscount((prev) => ({
      ...prev,
      code,
      error: null,
    }));
  }, []);

  return {
    discount,
    applyDiscount,
    toggleDiscount,
    resetDiscount,
    setDiscountCode,
  };
}