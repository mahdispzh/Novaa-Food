// src/app/profile/payment/_services/cart.api.ts

"use client";

import { apiClient } from "@/src/shared/api/client";
import { useAuthStore } from "@/src/shared/store/store";
import { AddToCartData, CartData } from "../../cart/_types/cart.types";

const getToken = (): string | undefined => {
  let token = localStorage.getItem("accessToken");
  if (!token) {
    token = useAuthStore.getState().accessToken;
  }
  return token || undefined;
};

const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const cartService = {
  // دریافت سبد خرید
  getCart: async (): Promise<{ data: CartData }> => {
    const token = getToken();
    const response = await apiClient.get("protected/cart", {
      headers: getHeaders(token),
    });
    return response.data;
  },

  // اضافه کردن به سبد خرید
  addToCart: async (data: AddToCartData): Promise<{ data: CartData }> => {
    const token = getToken();
    const response = await apiClient.post("protected/cart/items", data, {
      headers: getHeaders(token),
    });
    return response.data;
  },

  // افزایش تعداد
  increaseQuantity: async (productId: number, variantId: number): Promise<{ data: CartData }> => {
    const token = getToken();
    const response = await apiClient.patch(
      `protected/cart/items/increase`,
      { productId, variantId },
      { headers: getHeaders(token) }
    );
    return response.data;
  },

  // کاهش تعداد
  decreaseQuantity: async (productId: number, variantId: number): Promise<{ data: CartData }> => {
    const token = getToken();
    const response = await apiClient.patch(
      `protected/cart/items/decrease`,
      { productId, variantId },
      { headers: getHeaders(token) }
    );
    return response.data;
  },

  // حذف از سبد خرید
  removeFromCart: async (productId: number, variantId: number): Promise<{ data: CartData }> => {
    const token = getToken();
    const response = await apiClient.delete(
      `protected/cart/items?productId=${productId}&variantId=${variantId}`,
      { headers: getHeaders(token) }
    );
    return response.data;
  },

  // ✅ خالی کردن کامل سبد خرید
  clearCart: async (): Promise<{ data: CartData }> => {
    const token = getToken();
    console.log("🗑️ ارسال درخواست خالی کردن سبد خرید...");
    
    try {
      const response = await apiClient.delete("protected/cart/clear", {
        headers: getHeaders(token),
      });
      
      console.log("✅ سبد خرید با موفقیت خالی شد:", response.data);
      return response.data;
      
    } catch (error) {
      console.error("❌ خطا در خالی کردن سبد خرید:", error);
      throw error;
    }
  },
};