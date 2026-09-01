// src/app/profile/payment/_hooks/useCartData.ts

"use client";

import { useState, useEffect, useMemo } from "react";
import { useCart } from "../../cart/_hooks/useCart";
import shippingMethodsData from "../_constants/shipping-method.json";
import type { ShippingMethodType } from "../_types/common.types";
import type { Product } from "../../cart/_types/cart.types";
import { toast } from "react-hot-toast";

interface CartDataFromStorage {
  id?: number;
  products: Product[];
  totalItemsCount: number;
  totalCartPrice: number;
  selectedShipping?: ShippingMethodType;
  [key: string]: any;
}

export function useCartData() {
  const {
    products: cartProducts,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    totalItemsCount,
    totalCartPrice,
    isLoading: isCartLoading,
    error: cartError,
    cartId, // ✅ اضافه کردن cartId از useCart
        clearCartItems, // ✅ دریافت clearCartItems از useCart

  } = useCart();

  const [cartData, setCartData] = useState<CartDataFromStorage | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethodType>("regular");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("checkoutCartData");
      if (storedData) {
        const parsed = JSON.parse(storedData) as CartDataFromStorage;
        setCartData(parsed);
        setProducts(parsed.products || []);

        if (parsed.selectedShipping) {
          setSelectedShipping(parsed.selectedShipping);
        }

        console.log("✅ دیتای سبد خرید دریافت شد:", parsed);
        setError(null);
      } else {
        console.warn("⚠️ دیتایی در sessionStorage پیدا نشد");
      }
    } catch (e) {
      console.error("❌ خطا در دریافت دیتا از sessionStorage:", e);
      setError("خطا در بازیابی اطلاعات سبد خرید");
      toast.error("خطا در بازیابی اطلاعات سبد خرید");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const shippingMethods = useMemo(() => {
    return shippingMethodsData?.shippingMethods || {
      regular: { cost: 0 },
      express: { cost: 0 }
    };
  }, []);

  const regularShippingCost = shippingMethods.regular?.cost || 0;
  const expressShippingCost = shippingMethods.express?.cost || 0;

  const finalData = useMemo(() => {
    const itemsCount = totalItemsCount || cartData?.totalItemsCount || 0;
    const totalPrice = totalCartPrice || cartData?.totalCartPrice || 0;
    
    const productPrice = itemsCount > 0 && totalPrice > 0
      ? Math.floor(totalPrice / itemsCount)
      : 0;

    return {
      productCount: itemsCount,
      totalProductPrice: totalPrice,
      productPrice,
      regularShippingCost,
      expressShippingCost,
    };
  }, [
    totalItemsCount,
    totalCartPrice,
    cartData,
    regularShippingCost,
    expressShippingCost,
  ]);

  const shippingCost = useMemo(() => {
    return selectedShipping === "regular" 
      ? regularShippingCost 
      : expressShippingCost;
  }, [selectedShipping, regularShippingCost, expressShippingCost]);

  const finalTotalPrice = useMemo(() => {
    return finalData.totalProductPrice + shippingCost;
  }, [finalData.totalProductPrice, shippingCost]);

  const handleShippingChange = (method: ShippingMethodType) => {
    setSelectedShipping(method);
    if (cartData) {
      const updatedData = { ...cartData, selectedShipping: method };
      sessionStorage.setItem("checkoutCartData", JSON.stringify(updatedData));
      setCartData(updatedData);
    }
    toast.success(`روش حمل و نقل به ${method === 'regular' ? 'معمولی' : 'سریع'} تغییر یافت`);
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const storedData = sessionStorage.getItem("checkoutCartData");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setCartData(parsed);
        setProducts(parsed.products || []);
      }
      toast.success("اطلاعات سبد خرید به‌روزرسانی شد");
    } catch (err) {
      console.error("❌ خطا در رفرش دیتا:", err);
      toast.error("خطا در به‌روزرسانی اطلاعات");
    } finally {
      setIsLoading(false);
    }
  };

  const hasProducts = useMemo(() => {
    return (cartProducts?.length || 0) > 0 || (products?.length || 0) > 0;
  }, [cartProducts, products]);

  const isLoadingState = isLoading || isCartLoading;

  return {
    products: cartProducts || products,
    cartData,
    cartId: cartId || cartData?.id, // ✅ برگرداندن cartId
    selectedShipping,
    data: finalData,
    shippingCost,
    finalTotalPrice,
    productCount: finalData.productCount,
    totalProductPrice: finalData.totalProductPrice,
    hasProducts,
    isLoading: isLoadingState,
    error: error || cartError,
    setSelectedShipping: handleShippingChange,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    refreshData,
        clearCartItems, // ✅ برگرداندن clearCartItems

    regularShippingCost,
    expressShippingCost,
  };
}