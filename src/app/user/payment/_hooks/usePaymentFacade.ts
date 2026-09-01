// src/app/profile/payment/_hooks/usePaymentFacade.ts

"use client";
import { useState } from "react";

import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePaymentReducer } from "./usePaymentReducer";
import { useCartManager } from "./useCartManager";
import { useAddressManager } from "./useAddressManager";
import { useOrderCreation } from "./useOrderCreation";
import { usePaymentProcess } from "./usePaymentProcess";
import { usePaymentVerification } from "./usePaymentVerification";
import { useDiscountHandler } from "./useDiscountHandler";
import { useUpdateOrder } from "./useOrders";
import { paymentService } from "../_services/payment.api";
// ✅ هوک آپدیت وضعیت سفارش (status / paymentStatus) — مسیر رو با پروژه‌ات تطبیق بده
// ✅ سرویس آپدیت رکورد پرداخت (جدول payments) — مسیر رو با پروژه‌ات تطبیق بده

export function usePaymentFacade() {
  const searchParams = useSearchParams();
  const [savedProducts, setSavedProducts] = useState<Array<{
  id: number;
  imageSrc: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}>>([]);
  // ✅ استفاده از همه هوک‌ها
  const {
    state,
    setStep,
    nextStep,
    prevStep,
    setShipping,
    setGateway,
    setOrder,
    setProcessing,
    setPaymentStatus,
    setVerifying,
  } = usePaymentReducer();

  const cartManager = useCartManager();
  const addressManager = useAddressManager();
  const orderCreation = useOrderCreation();
  const paymentProcess = usePaymentProcess();
  const paymentVerification = usePaymentVerification();
  const discountHandler = useDiscountHandler(cartManager.finalTotalPrice);
  // ✅ هوک آپدیت سفارش (برای سینک کردن status/paymentStatus بعد از نتیجه پرداخت)
  const updateOrderMutation = useUpdateOrder();

  // ✅ محاسبه قیمت‌ها
  const totalPrice = cartManager.finalTotalPrice;
  const finalPrice = totalPrice - discountHandler.discount.amount;

  // ✅ ایجاد سفارش
  const handleCreateOrder = useCallback(async () => {
    setSavedProducts(
  cartManager.products.map((p: any) => ({
    id: p.id,
    imageSrc: p.imageSrc || p.image || "/images/placeholder.svg",
    title: p.productName || p.name || "محصول",
    price: p.price || 0,
    quantity: p.quantity || 1,
    size: p.sizeName || p.size,
    color: p.colorHex || p.colorCode,
  }))
);
    setProcessing(true);

    try {
      const order = await orderCreation.createOrder({
        cartId: cartManager.cartId!,
        addressId: addressManager.selectedAddressId!,
        totalPrice: totalPrice,
        shippingMethod: state.selectedShipping,
        paymentMethod: state.selectedGateway,
discountCode: discountHandler.discount.code || null,
        items: cartManager.products.map((product: any) => ({
          productId: product.productId,
          variantId: product.variantId,
          quantity: product.quantity,
          price: product.price,
        })),
      });

      if (order) {
        setOrder(order.id, order);
        nextStep(); // رفتن به مرحله پرداخت
        console.log("✅ سفارش ایجاد شد و به مرحله بعد رفتیم");
      }
    } catch (error) {
      console.error("❌ خطا در ایجاد سفارش:", error);
    } finally {
      setProcessing(false);
    }
  }, [
    cartManager.cartId,
    cartManager.products,
    addressManager.selectedAddressId,
    totalPrice,
    state.selectedShipping,
    state.selectedGateway,
    discountHandler.discount.code,
    orderCreation,
    setOrder,
    nextStep,
    setProcessing,
  ]);

  // ✅ شروع پرداخت
  const handleStartPayment = useCallback(async () => {
    if (!state.orderId || !state.orderData) {
      console.error("❌ سفارشی برای پرداخت وجود ندارد");
      return;
    }

    setProcessing(true);

    try {
      const result = await paymentProcess.processPayment({
        orderId: state.orderId,
        amount: state.orderData.total_price || finalPrice,
        paymentMethod: state.selectedGateway,
      });

      if (result?.paymentUrl) {
        // ✅ هدایت به درگاه پرداخت
        // نتیجه‌ی نهایی پرداخت بعداً از طریق برگشت از درگاه (handleVerifyPayment) مشخص می‌شود
        console.log("🔗 هدایت به درگاه پرداخت:", result.paymentUrl);
        window.location.href = result.paymentUrl;
      } else if (result?.success) {
        // ✅ پرداخت موفق بدون نیاز به درگاه
        // -> هم رکورد payments (جدول payments) و هم status/paymentStatus سفارش باید آپدیت شوند
        console.log("✅ پرداخت موفق بدون درگاه");

        try {
          await Promise.all([
            updateOrderMutation.mutateAsync({
              orderId: state.orderId,
              data: { status: 1, paymentStatus: 1 },
            }),
            result.paymentId
              ? paymentService.updatePayment(result.paymentId, {
                  status: 1,
                  paidAt: new Date().toISOString(),
                })
              : Promise.resolve(),
          ]);
        } catch (updateError) {
          // ✅ حتی اگه سینک وضعیت fail بشه، تجربه‌ی کاربر (رفتن به صفحه موفقیت) نباید قطع بشه
          console.error("❌ خطا در آپدیت وضعیت سفارش/پرداخت بعد از پرداخت موفق:", updateError);
        }

        await handleSuccessfulPayment();
      } else {
        // ❌ پرداخت ناموفق
        // -> رکورد payments و paymentStatus سفارش ناموفق می‌شوند؛ status سفارش دست‌نخورده می‌ماند
        // تا کاربر بتواند دوباره تلاش کند (سفارش هنوز در انتظار پرداخت است)
        console.error("❌ پرداخت ناموفق:", result?.error);

        try {
          await Promise.all([
            updateOrderMutation.mutateAsync({
              orderId: state.orderId,
              data: { paymentStatus: 2 },
            }),
            result?.paymentId
              ? paymentService.updatePayment(result.paymentId, { status: 2 })
              : Promise.resolve(),
          ]);
        } catch (updateError) {
          console.error("❌ خطا در آپدیت وضعیت سفارش/پرداخت بعد از پرداخت ناموفق:", updateError);
        }
      }
    } catch (error) {
      console.error("❌ خطا در پرداخت:", error);
    } finally {
      setProcessing(false);
    }
  }, [
    state.orderId,
    state.orderData,
    state.selectedGateway,
    finalPrice,
    paymentProcess,
    setProcessing,
    updateOrderMutation,
  ]);

  // ✅ پرداخت موفق
  const handleSuccessfulPayment = useCallback(async () => {
    try {
      // ✅ خالی کردن سبد خرید
      await cartManager.clearCartAfterSuccessfulPayment();
      
      // ✅ تنظیم وضعیت موفق
      setPaymentStatus("success");
      
      // ✅ رفتن به مرحله نمایش نتیجه
      setStep("success");
      
      console.log("🎉 پرداخت با موفقیت انجام شد");
    } catch (error) {
      console.error("❌ خطا در تکمیل پرداخت:", error);
    }
  }, [cartManager, setPaymentStatus, setStep]);

  // ✅ بررسی وضعیت پرداخت (وقتی از درگاه برمی‌گردد)
  const handleVerifyPayment = useCallback(async () => {
    const orderId = searchParams.get("orderId");
    const statusParam = searchParams.get("status");

    if (!orderId) {
      return;
    }

    console.log(`🔍 بررسی وضعیت پرداخت برای سفارش ${orderId}`);
    setVerifying(true);

    try {
      const result = await paymentVerification.verifyPayment(Number(orderId));

      if (result) {
        console.log(`📊 وضعیت پرداخت: ${result.status}`);
        setPaymentStatus(result.status);

        // ✅ آیدی رکورد پرداخت (جدول payments) که verify endpoint برمی‌گردونه
        const paymentId: number | undefined = (result as any).payment?.id;

        if (result.status === "success") {
          // ✅ پرداخت موفق -> هم رکورد payments و هم status/paymentStatus سفارش را آپدیت کن
          try {
            await Promise.all([
              updateOrderMutation.mutateAsync({
                orderId: Number(orderId),
                data: { status: 1, paymentStatus: 1 },
              }),
              paymentId
                ? paymentService.updatePayment(paymentId, {
                    status: 1,
                    paidAt: new Date().toISOString(),
                  })
                : Promise.resolve(),
            ]);
          } catch (updateError) {
            console.error("❌ خطا در آپدیت وضعیت سفارش/پرداخت بعد از تایید پرداخت موفق:", updateError);
          }

          await cartManager.clearCartAfterSuccessfulPayment();
          setStep("success");
          console.log("✅ پرداخت تایید شد و سبد خرید خالی شد");
        } else if (result.status === "unsuccess") {
          // ❌ پرداخت ناموفق -> رکورد payments و paymentStatus سفارش ناموفق؛ status سفارش دست‌نخورده می‌ماند
          try {
            await Promise.all([
              updateOrderMutation.mutateAsync({
                orderId: Number(orderId),
                data: { paymentStatus: 2 },
              }),
              paymentId
                ? paymentService.updatePayment(paymentId, { status: 2 })
                : Promise.resolve(),
            ]);
          } catch (updateError) {
            console.error("❌ خطا در آپدیت وضعیت سفارش/پرداخت بعد از پرداخت ناموفق:", updateError);
          }

          setStep("success");
          console.log(`⚠️ وضعیت پرداخت: ${result.status}`);
        } else {
          // ⚠️ نامشخص -> رکورد payments و paymentStatus سفارش = 3
          try {
            await Promise.all([
              updateOrderMutation.mutateAsync({
                orderId: Number(orderId),
                data: { paymentStatus: 3 },
              }),
              paymentId
                ? paymentService.updatePayment(paymentId, { status: 3 })
                : Promise.resolve(),
            ]);
          } catch (updateError) {
            console.error("❌ خطا در آپدیت وضعیت سفارش/پرداخت بعد از پرداخت نامشخص:", updateError);
          }

          setStep("success");
          console.log(`⚠️ وضعیت پرداخت: ${result.status}`);
        }
      }
    } catch (error) {
      console.error("❌ خطا در بررسی پرداخت:", error);
    } finally {
      setVerifying(false);
    }
  }, [searchParams, paymentVerification, cartManager, setPaymentStatus, setStep, setVerifying, updateOrderMutation]);

  // ✅ بررسی خودکار هنگام بارگذاری صفحه
  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    if (orderId && status) {
      handleVerifyPayment();
    }
  }, [searchParams, handleVerifyPayment]);

  // ✅ اطلاعات برای رندر
  const paymentInfo = {
    totalPrice,
    finalPrice,
    shippingCost: cartManager.shippingCost,
    productCount: cartManager.totalItemsCount,
    products: cartManager.products,
    selectedAddress: addressManager.selectedAddress,
    discount: discountHandler.discount,
    orderData: state.orderData,
    orderId: state.orderId,
    isProcessing: state.isProcessing || orderCreation.isLoading,
    isVerifying: state.isVerifying,
    paymentStatus: state.paymentStatus,
    step: state.step,
    selectedShipping: state.selectedShipping,
    selectedGateway: state.selectedGateway,
  };

  return {
    // State
    ...paymentInfo,
    
    // Address
    addresses: addressManager.addresses,
    selectedAddressId: addressManager.selectedAddressId,
    isAddressModalOpen: addressManager.isAddressModalOpen,
    openAddressModal: addressManager.openAddressModal,
    closeAddressModal: addressManager.closeAddressModal,
    setSelectedAddressId: addressManager.setSelectedAddressId,
    confirmAddressSelection: addressManager.confirmAddressSelection,
    
    // Cart Actions
    handleProductIncrease: cartManager.handleProductIncrease,
    handleProductDecrease: cartManager.handleProductDecrease,
    handleProductRemove: cartManager.handleProductRemove,
    
    // Navigation
    goToNextStep: nextStep,
    goToPrevStep: prevStep,
    goToStep: setStep,
    
    // Shipping & Payment
    selectShipping: setShipping,
    selectGateway: setGateway,
    
    // Order & Payment Actions
    createOrder: handleCreateOrder,
    startPayment: handleStartPayment,
    verifyPayment: handleVerifyPayment,
    
    // Discount
    discountCodeInput: discountHandler.discount.code,
    discountError: discountHandler.discount.error,
    isDiscountOpen: discountHandler.discount.isOpen,
    setDiscountCodeInput: discountHandler.setDiscountCode,
    applyDiscount: discountHandler.applyDiscount,
    toggleDiscount: discountHandler.toggleDiscount,
    
    // ✅ اضافه کردن توابع مورد نیاز برای صفحه
    setPaymentStatus,
    clearCartAfterSuccessfulPayment: cartManager.clearCartAfterSuccessfulPayment,
    savedProducts,
  };
}