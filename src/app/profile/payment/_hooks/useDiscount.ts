// src/app/profile/payment/_hooks/useDiscount.ts

import { useState } from "react";

export function useDiscount(totalPrice: number) {
  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  const applyDiscount = (code: string) => {
    const normalizedCode = code.trim().toUpperCase();
    
    if (normalizedCode === "SAVE10") {
      setDiscountAmount(Math.floor(totalPrice * 0.1));
      setDiscountError(null);
    } else if (normalizedCode === "SAVE20") {
      setDiscountAmount(Math.floor(totalPrice * 0.2));
      setDiscountError(null);
    } else {
      setDiscountError("کد تخفیف نامعتبر است");
      setDiscountAmount(0);
    }
    setDiscountCodeInput("");
    setIsDiscountOpen(false);
  };

  const toggleDiscount = () => setIsDiscountOpen((prev) => !prev);

  return {
    discountCodeInput,
    discountAmount,
    discountError,
    isDiscountOpen,
    setDiscountCodeInput,
    applyDiscount,
    toggleDiscount,
  };
}