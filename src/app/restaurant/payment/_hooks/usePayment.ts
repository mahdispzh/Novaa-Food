// src/app/profile/payment/_hooks/usePayment.ts

"use client";

import { useState, useCallback, useMemo } from "react";
import { useAddress } from "./useAddress";
import { useCreateOrder } from "./useOrders";
import { useCartData } from "./useCartData";
import type { CreateOrderData, Order } from "../_types/order.types";
import type { Step } from "../_types/common.types";
import { STEPS } from "../_constants/payment.data";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/shared/store/store";

export function usePayment() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("order-summary");
  const [selectedGateway, setSelectedGateway] = useState<"pasargad" | "saman">("pasargad");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
const [savedProducts, setSavedProducts] = useState<Array<{
  id: number;
  imageSrc: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}>>([]);
  // هوک‌های دیگر
  const {
    addresses,
    address,
    selectedAddressId,
    isAddressModalOpen,
    isLoadingAddresses,
    openAddressModal,
    closeAddressModal,
    setSelectedAddressId,
    confirmAddressSelection,
    refreshAddresses,
  } = useAddress();

  const {
    products,
    selectedShipping,
    setSelectedShipping,
    cartId, // ✅ مستقیم از useCartData (که خودش از useCart واقعی می‌آید)
    shippingCost,
    finalTotalPrice,
    productCount,
    totalProductPrice,
    isLoading: isCartLoading,
    error: cartError,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    clearCartItems,
    refreshData,
  } = useCartData();

  const createOrderMutation = useCreateOrder();

  // محاسبات قیمت
  const totalPrice = useMemo(() => finalTotalPrice, [finalTotalPrice]);
  const finalPrice = useMemo(() => totalPrice - discountAmount, [totalPrice, discountAmount]);

  const data = useMemo(
    () => ({ productCount, totalProductPrice }),
    [productCount, totalProductPrice],
  );

  // ============================================
  // Navigation
  // ============================================
  const goToNextStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(step);
    const nextStep = STEPS[currentIndex + 1];
    if (nextStep) setStep(nextStep);
  }, [step]);

  const goToPrevStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(step);
    const prevStep = STEPS[currentIndex - 1];
    if (prevStep) setStep(prevStep);
  }, [step]);

  // پرش مستقیم به یک مرحله‌ی مشخص (برای "تغییر روش پرداخت" یا "پرداخت دوباره")
  const goToStep = useCallback((target: Step) => {
    setStep(target);
  }, []);

  const selectShipping = useCallback(
    (method: Parameters<typeof setSelectedShipping>[0]) => setSelectedShipping(method),
    [setSelectedShipping],
  );

  const selectGateway = useCallback((gateway: "pasargad" | "saman") => {
    setSelectedGateway(gateway);
  }, []);

  // ============================================
  // ایجاد سفارش
  // ============================================
  const createOrder = useCallback(async () => {
    // اعتبارسنجی آدرس
    if (!selectedAddressId) {
      toast.error("لطفاً آدرس تحویل را انتخاب کنید");
      return;
    }

    // اعتبارسنجی محصولات
    if (products.length === 0) {
      toast.error("سبد خرید شما خالی است");
      return;
    }

    // دریافت cartId مستقیماً از داده‌ی سبد خرید (بدون منبع موازی sessionStorage)
   if (!cartId) {
  toast.error("شناسه سبد خرید یافت نشد");
  return;
}

    // بررسی کامل بودن اطلاعات محصولات
    const invalidProduct = products.find(
      (p: any) => !p.productId || !p.variantId,
    );
    if (invalidProduct) {
      console.error("❌ آیتم ناقص:", invalidProduct);
      toast.error("اطلاعات یکی از محصولات ناقص است، لطفاً صفحه را رفرش کنید");
      return;
    }

    setIsCreatingOrder(true);

    try {
     const orderDataPayload: CreateOrderData = {
  cartId,
  addressId: Number(selectedAddressId),
  totalPrice,
  shippingMethod: selectedShipping,
  paymentMethod: selectedGateway,
  items: products.map((product) => ({
    productId: Number(product.productId),
    variantId: Number(product.variantId),
    quantity: product.quantity || 1,
    price: product.price || 0,
  })),
};
      

      if (discountCodeInput?.trim()) {
        orderDataPayload.discountCode = discountCodeInput;
      }

      const result = await createOrderMutation.mutateAsync(orderDataPayload);
      // CreateOrderResponse فقط data.id دارد؛ فرمت‌های احتمالی دیگر پاسخ سرور را
      // بدون خطای تایپ پوشش می‌دهیم
      const orderId = result?.data?.id ?? (result as { id?: number })?.id;

      if (!orderId) {
        throw new Error("شناسه سفارش دریافت نشد");
      }

      // ✅ منبع واحد: فقط state هوک (این هوک در کل مسیر پرداخت زنده می‌ماند،
      // پس نیازی به ذخیره‌ی موازی در sessionStorage نیست)
      setCurrentOrderId(orderId);
      setOrderData(result.data || result);
setSavedProducts(
  formattedProducts.map((p) => ({
    id: p.id,
    imageSrc: p.imageSrc,
    title: p.productName,
    price: p.price,
    quantity: p.quantity,
    size: p.sizeName,
    color: p.colorHex,
  }))
);
      // ✅ سبد خرید باید بعد از ثبت سفارش خالی شود
      await clearCartItems();
      await refreshData();

      toast.success("سفارش با موفقیت ثبت شد");
      goToNextStep();
    } catch (error) {
      console.error("❌ خطا در ایجاد سفارش:", error);
      toast.error(error instanceof Error ? error.message : "خطا در ثبت سفارش");
    } finally {
      setIsCreatingOrder(false);
    }
  }, [
     selectedAddressId,
  products,
  cartId,
  selectedShipping,
  selectedGateway,
  discountCodeInput,
  totalPrice,
  createOrderMutation,
  clearCartItems,
  refreshData,
  goToNextStep,
  ]);

  // ============================================
  // شروع پرداخت
  // ============================================
  const startPayment = useCallback(async () => {
    if (!currentOrderId || !orderData) {
      toast.error("سفارشی برای پرداخت وجود ندارد");
      return;
    }

    setIsProcessingPayment(true);

    try {
      const paymentAmount = orderData.total_price || finalPrice;

      const paymentData = {
        orderId: currentOrderId,
        amount: paymentAmount,
        paymentMethod: selectedGateway,
        status: 0, // 0 = در انتظار (مطابق قرارداد PAYMENT_STATUS.PENDING)
        transactionCode: `PAY-${currentOrderId}-${Date.now()}`,
        paidAt: null,
      };

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
        return;
      }

      const response = await fetch("/api/protected/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        toast.error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید");
        router.push("/auth/login");
        return;
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

      const paymentUrl =
        result.paymentUrl ||
        result.paymentLink ||
        result.redirectUrl ||
        result.url ||
        result.data?.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      // اگر URL درگاه برنگشت، یعنی خودِ سرور بلافاصله نتیجه را داده —
      // به مرحله‌ی نمایش وضعیت برو تا PaymentStatus بر اساس orderData واقعی رندر شود.
      // TODO: وقتی بانک بعد از پرداخت کاربر را برمی‌گرداند (redirect/callback)،
      // orderData باید با نتیجه‌ی واقعی از سرور refresh شود؛ اینجا صرفاً مسیر پیش‌فرض است.
      goToStep("success");
    } catch (error) {
      console.error("❌ خطا در پرداخت:", error);
      toast.error(error instanceof Error ? error.message : "خطا در پرداخت");
    } finally {
      setIsProcessingPayment(false);
    }
  }, [currentOrderId, orderData, selectedGateway, finalPrice, router, goToStep]);

  // ============================================
  // مدیریت تخفیف
  // ============================================
  const applyDiscount = useCallback(async () => {
    if (!discountCodeInput.trim()) {
      setDiscountError("لطفاً کد تخفیف را وارد کنید");
      return;
    }

    try {
      const response = await fetch("/api/discount/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: discountCodeInput,
          total: totalProductPrice,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "کد تخفیف نامعتبر است");
      }

      const data = await response.json();
      setDiscountAmount(data.discountAmount || data.amount || 0);
      setDiscountError(null);
      setIsDiscountOpen(false);
      toast.success("✅ تخفیف اعمال شد");
    } catch (error) {
      setDiscountError(error instanceof Error ? error.message : "خطا در اعمال تخفیف");
      toast.error(error instanceof Error ? error.message : "خطا در اعمال تخفیف");
    }
  }, [discountCodeInput, totalProductPrice]);

  const toggleDiscount = useCallback(() => {
    setIsDiscountOpen((prev) => !prev);
    if (!isDiscountOpen) setDiscountError(null);
  }, [isDiscountOpen]);

  // ============================================
  // فرمت محصولات برای نمایش
  // ============================================
  const formattedProducts = useMemo(() => {
    return products.map((product: any) => ({
      id: product.id,
      productId: product.productId,
      variantId: product.variantId,
      productName: product.productName || product.name || "محصول",
      imageSrc: product.imageSrc || product.image || "/images/placeholder.svg",
      colorName: product.colorName || product.color || "نامشخص",
      colorHex: product.colorHex || "#CCCCCC",
      sizeName: product.sizeName || product.size || "نامشخص",
      price: product.price || 0,
      discount: product.discount,
      quantity: product.quantity || 1,
    }));
  }, [products]);

  // ============================================
  // خروجی هوک
  // ============================================
  return {
    step,
    goToNextStep,
    goToPrevStep,
    goToStep,
    createOrder,
    currentOrderId,
    orderData,
    isCreatingOrder,
    selectedShipping,
    selectShipping,
    shippingCost,
    selectedGateway,
    selectGateway,
    isProcessingPayment,
    startPayment,
    isDiscountOpen,
    discountCodeInput,
    discountError,
    applyDiscount,
    toggleDiscount,
    setDiscountCodeInput,
    address,
    isAddressModalOpen,
    isLoadingAddresses,
    selectedAddressId,
    addresses,
    openAddressModal,
    closeAddressModal,
    setSelectedAddressId,
    confirmAddressSelection,
    refreshAddresses,
    data,
    totalPrice,
    finalPrice,
    products: formattedProducts,
    productCount,
    totalProductPrice,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    isLoading: isCartLoading,
    error: cartError,
    refreshData,
    savedProducts,

  };
}