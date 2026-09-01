// src/app/profile/payment/_hooks/useCartManager.ts

"use client";

import { useCallback, useMemo } from "react";
import { useCart } from "../../cart/_hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useCartManager() {
  const queryClient = useQueryClient();
  const {
    products,
    totalItemsCount,
    totalCartPrice,
    isLoading,
    error,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    clearCartItems,
    cartId,
    // ✅ refreshData از useCart موجود نیست، پس خودمان پیاده‌سازی می‌کنیم
  } = useCart();

  // ✅ تابع رفرش دیتا (با استفاده از invalidateQueries)
  const refreshData = useCallback(async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("اطلاعات سبد خرید به‌روزرسانی شد");
    } catch (error) {
      console.error("❌ خطا در رفرش دیتا:", error);
      toast.error("خطا در به‌روزرسانی اطلاعات");
    }
  }, [queryClient]);

  // ✅ محاسبه هزینه ارسال
  const shippingCost = useMemo(() => {
    // این مقدار از API یا تنظیمات خوانده می‌شود
    return 60000; // مقدار نمونه
  }, []);

  // ✅ محاسبه قیمت نهایی
  const finalTotalPrice = useMemo(() => {
    return totalCartPrice + shippingCost;
  }, [totalCartPrice, shippingCost]);

  // ✅ خالی کردن سبد خرید بعد از پرداخت موفق
  const clearCartAfterSuccessfulPayment = useCallback(async () => {
    try {
      await clearCartItems();
      // پاک کردن کش
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      // پاک کردن دیتای موقت
      sessionStorage.removeItem("checkoutCartData");
      toast.success("سبد خرید خالی شد");
      console.log("✅ سبد خرید بعد از پرداخت موفق خالی شد");
    } catch (error) {
      console.error("❌ خطا در خالی کردن سبد خرید:", error);
      toast.error("خطا در خالی کردن سبد خرید");
    }
  }, [clearCartItems, queryClient]);

  return {
    products,
    totalItemsCount,
    totalCartPrice,
    shippingCost,
    finalTotalPrice,
    isLoading,
    error,
    cartId,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    clearCartAfterSuccessfulPayment,
    refreshData, // ✅ اضافه کردن refreshData
  };
}