// src/app/profile/orders/_services/order.api.ts

"use client";

import type { CreateOrderData, CreateOrderResponse } from "../_types/order.types";
import { useAuthStore } from "@/src/shared/store/store";

class OrderService {
  private getToken(): string | null {
    // روش‌های مختلف برای دریافت توکن
    let token = localStorage.getItem("accessToken");

    if (!token) {
      // از store بگیر
      try {
        const storeToken = useAuthStore.getState().accessToken;
        if (storeToken) {
          token = storeToken;
          // ذخیره در localStorage برای دفعات بعد
          localStorage.setItem("accessToken", token);
        }
      } catch (e) {
        console.warn("⚠️ Could not get token from store");
      }
    }

    return token;
  }

  private async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      const newToken = data.accessToken || data.token;

      if (newToken) {
        localStorage.setItem("accessToken", newToken);
        // ✅ در store واقعی متد به این اسمه: setToken (نه setAccessToken)
        useAuthStore.getState().setToken(newToken);
        return newToken;
      }

      return null;
    } catch (error) {
      console.error("❌ Error refreshing token:", error);
      // پاک کردن توکن‌های منقضی شده
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  }

  async createOrder(data: CreateOrderData): Promise<CreateOrderResponse> {
    console.log("📡 ایجاد سفارش جدید در API");
    console.log("📦 داده‌های ارسالی:", JSON.stringify(data, null, 2));

    let token = this.getToken();
    console.log("🔑 Token:", token ? "✅ موجود" : "❌ ناموجود");

    if (!token) {
      throw new Error("لطفاً وارد حساب کاربری خود شوید");
    }

    try {
      const response = await fetch('/api/protected/orders/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(`📡 پاسخ دریافت شد: ${response.status}`);

      // اگر توکن منقضی شده بود، رفرش کن و دوباره تلاش کن
      if (response.status === 401) {
        console.log("🔄 توکن منقضی شده، تلاش برای دریافت توکن جدید...");

        const newToken = await this.refreshToken();

        if (!newToken) {
          // اگر رفرش ناموفق بود، کاربر را به لاگین هدایت کن
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login?redirect=/profile/payment';
          }

          throw new Error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید");
        }

        // تلاش مجدد با توکن جدید
        console.log("🔄 تلاش مجدد با توکن جدید...");
        const retryResponse = await fetch('/api/protected/orders/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
          },
          body: JSON.stringify(data),
        });

        if (!retryResponse.ok) {
          const errorText = await retryResponse.text();
          console.error(`❌ خطا در تلاش مجدد: ${retryResponse.status} - ${errorText}`);
          throw new Error("خطا در ثبت سفارش پس از رفرش توکن");
        }

        const result = await retryResponse.json();
        console.log("✅ سفارش ایجاد شد:", result);

        if (result.data) {
          return result;
        }

        return {
          data: result,
          message: "سفارش با موفقیت ایجاد شد",
          status: "success",
        };
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ خطا: ${response.status} - ${errorText}`);

        let errorMessage = `خطا در ثبت سفارش: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("✅ سفارش ایجاد شد:", result);

      if (result.data) {
        return result;
      }

      return {
        data: result,
        message: "سفارش با موفقیت ایجاد شد",
        status: "success",
      };
    } catch (error) {
      console.error("❌ خطا در ایجاد سفارش:", error);
      throw error;
    }
  }

  // ✅ آپدیت وضعیت سفارش (status و/یا paymentStatus)
  // مثال بعد از پرداخت موفق: updateOrder(orderId, { status: 1, paymentStatus: 1 })
  // مثال بعد از پرداخت ناموفق: updateOrder(orderId, { paymentStatus: 2 })
  // مثال بعد از پرداخت نامشخص: updateOrder(orderId, { paymentStatus: 3 })
  async updateOrder(
    orderId: number,
    data: { status?: number; paymentStatus?: number }
  ): Promise<any> {
    console.log(`📡 آپدیت سفارش ${orderId}:`, data);

    let token = this.getToken();
    console.log("🔑 Token:", token ? "✅ موجود" : "❌ ناموجود");

    if (!token) {
      throw new Error("لطفاً وارد حساب کاربری خود شوید");
    }

    const doRequest = (authToken: string) =>
      fetch(`/api/protected/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

    try {
      let response = await doRequest(token);

      console.log(`📡 پاسخ دریافت شد: ${response.status}`);

      if (response.status === 401) {
        console.log("🔄 توکن منقضی شده، تلاش برای دریافت توکن جدید...");

        const newToken = await this.refreshToken();

        if (!newToken) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login?redirect=/profile/payment';
          }

          throw new Error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید");
        }

        response = await doRequest(newToken);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ خطا در آپدیت سفارش: ${response.status} - ${errorText}`);

        let errorMessage = `خطا در آپدیت وضعیت سفارش: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("✅ سفارش آپدیت شد:", result);

      return result.data || result;
    } catch (error) {
      console.error("❌ خطا در آپدیت سفارش:", error);
      throw error;
    }
  }

  async getOrders(page = 1, limit = 10) {
    let token = this.getToken();

    try {
      const response = await fetch(
        `/api/protected/orders/me?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.status === 401) {
        console.log("🔄 توکن منقضی شده، تلاش برای دریافت توکن جدید...");

        const newToken = await this.refreshToken();

        if (!newToken) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login?redirect=/profile/orders';
          }

          throw new Error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید");
        }

        // تلاش مجدد با توکن جدید
        const retryResponse = await fetch(
          `/api/protected/orders/me?page=${page}&limit=${limit}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken}`,
            },
          }
        );

        if (!retryResponse.ok) {
          const errorText = await retryResponse.text();
          throw new Error(`خطا: ${retryResponse.status} - ${errorText}`);
        }

        return retryResponse.json();
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`خطا: ${response.status} - ${errorText}`);
      }

      return response.json();
    } catch (error) {
      console.error("❌ خطا در دریافت سفارشات:", error);
      throw error;
    }
  }
}

export const orderService = new OrderService();