// src/app/profile/payments/_services/payment.api.ts

import { apiClient } from "@/src/shared/api/client";
import { useAuthStore } from "@/src/shared/store/store";
import type { Payment, PaymentFilters, PaymentsResponse } from "../_types/payment.types";

// ============================================
// توابع کمکی با مدیریت بهتر خطا
// ============================================

const getToken = (): string | undefined => {
  try {
    // اول از localStorage
    let token = localStorage.getItem("accessToken");
    
    // اگر نبود از store
    if (!token) {
      const storeToken = useAuthStore.getState().accessToken;
      if (storeToken) {
        token = storeToken;
        // ذخیره در localStorage برای دفعات بعد
        localStorage.setItem("accessToken", token);
      }
    }
    
    return token || undefined;
  } catch (error) {
    console.error("❌ خطا در دریافت توکن:", error);
    return undefined;
  }
};

const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const buildQueryParams = (filters: PaymentFilters): string => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.status !== undefined && filters.status !== null) {
    params.append("status", filters.status.toString());
  }
  if (filters.paymentMethod) params.append("paymentMethod", filters.paymentMethod);
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
  
  return params.toString();
};

// ============================================
// سرویس پرداخت
// ============================================

export const paymentService = {
  // دریافت همه پرداخت‌ها (ادمین)
  getAllPayments: async (filters: PaymentFilters = {}): Promise<PaymentsResponse> => {
    try {
      const token = getToken();
      const queryString = buildQueryParams(filters);
      
      const response = await apiClient.get(`protected/payments?${queryString}`, {
        headers: getHeaders(token)
      });
      
      return response.data;
    } catch (error) {
      console.error("❌ خطا در دریافت لیست پرداخت‌ها:", error);
      throw error;
    }
  },

  // دریافت پرداخت‌های کاربر جاری
  getUserPayments: async (filters: PaymentFilters = {}): Promise<PaymentsResponse> => {
    try {
      const token = getToken();
      const queryString = buildQueryParams(filters);
      
      const response = await apiClient.get(`protected/user/payments?${queryString}`, {
        headers: getHeaders(token)
      });
      
      return response.data;
    } catch (error) {
      console.error("❌ خطا در دریافت پرداخت‌های کاربر:", error);
      throw error;
    }
  },

  // دریافت یک پرداخت با آیدی
  getPaymentById: async (paymentId: number): Promise<Payment> => {
    try {
      const token = getToken();
      
      const response = await apiClient.get(`protected/payments/${paymentId}`, {
        headers: getHeaders(token)
      });
      
      return response.data;
    } catch (error) {
      console.error(`❌ خطا در دریافت پرداخت ${paymentId}:`, error);
      throw error;
    }
  },

  // ✅ ایجاد پرداخت جدید
  createPayment: async (data: {
    orderId: number;
    amount: number;
    paymentMethod: string;
    status: number;
    transactionCode?: string;
    paidAt?: string | null;
  }): Promise<Payment> => {
    const token = getToken();
    
    console.log("💳 ایجاد پرداخت با داده:", {
      ...data,
      amount: data.amount,
      orderId: data.orderId,
    });
    
    if (!token) {
      throw new Error("لطفاً وارد حساب کاربری خود شوید");
    }

    try {
      const response = await fetch("/api/protected/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: Number(data.orderId),
          amount: Number(data.amount),
          paymentMethod: data.paymentMethod,
          status: Number(data.status),
          transactionCode: data.transactionCode || `PAY-${data.orderId}-${Date.now()}`,
          paidAt: data.paidAt || null,
        }),
      });

      console.log("📡 وضعیت پاسخ سرور:", response.status);

      // مدیریت خطای 401 (عدم احراز هویت)
      if (response.status === 401) {
        // پاک کردن توکن‌های منقضی شده
        localStorage.removeItem("accessToken");
        throw new Error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید");
      }

      // مدیریت خطای 403 (عدم دسترسی)
      if (response.status === 403) {
        throw new Error("شما دسترسی لازم برای این عملیات را ندارید");
      }

      // مدیریت خطای 404 (پیدا نشد)
      if (response.status === 404) {
        throw new Error("سفارش مورد نظر یافت نشد");
      }

      // مدیریت خطای 400 (درخواست نادرست)
      if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "داده‌های ارسالی نادرست است");
      }

      // بررسی سایر خطاها
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ خطای سرور:", errorText);
        
        let errorMessage = `خطا در پرداخت (کد ${response.status})`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // پردازش پاسخ موفق
      const result = await response.json();
      console.log("✅ پرداخت با موفقیت ایجاد شد:", result);
      
      // اطمینان از وجود data در پاسخ
      if (!result.data && result.id) {
        // اگر پاسخ مستقیماً داده بود
        return result;
      }
      
      return result.data || result;
      
    } catch (error) {
      console.error("❌ خطا در ایجاد پرداخت:", error);
      
      // بازنویسی خطاهای خاص
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error("خطای ناشناخته در ایجاد پرداخت");
    }
  },

  // ✅ آپدیت پرداخت
  // نکته مهم: فقط فیلدهایی که واقعاً پاس داده شدن به بک‌اند فرستاده می‌شن.
  // قبلاً transactionCode/paidAt نبود رو به‌جای حذف، صریحاً null می‌فرستاد که
  // اگه ستون transaction_code تو دیتابیس NOT NULL باشه باعث خطای 500 می‌شد.
  updatePayment: async (paymentId: number, data: {
    status: number;
    transactionCode?: string;
    paidAt?: string;
  }): Promise<Payment> => {
    try {
      const token = getToken();
      
      if (!token) {
        throw new Error("لطفاً وارد حساب کاربری خود شوید");
      }

      const payload: Record<string, any> = {
        status: Number(data.status),
      };

      // ✅ فقط اگه واقعاً مقدار داده شده، تو payload بذار
      if (data.transactionCode !== undefined) {
        payload.transactionCode = data.transactionCode;
      }
      if (data.paidAt !== undefined) {
        payload.paidAt = data.paidAt;
      }

      const response = await apiClient.put(`protected/payments/${paymentId}`, payload, {
        headers: getHeaders(token)
      });
      
      return response.data;
    } catch (error) {
      console.error(`❌ خطا در آپدیت پرداخت ${paymentId}:`, error);
      throw error;
    }
  },

  // حذف پرداخت (ادمین)
  deletePayment: async (paymentId: number): Promise<{ success: boolean }> => {
    try {
      const token = getToken();
      
      if (!token) {
        throw new Error("لطفاً وارد حساب کاربری خود شوید");
      }

      const response = await apiClient.delete(`protected/payments/${paymentId}`, {
        headers: getHeaders(token)
      });
      
      return response.data;
    } catch (error) {
      console.error(`❌ خطا در حذف پرداخت ${paymentId}:`, error);
      throw error;
    }
  },
};

// ============================================
// تایپ‌های کمکی برای استفاده در کامپوننت‌ها
// ============================================

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export const PaymentStatusMap: Record<PaymentStatus, number> = {
  pending: 1,
  paid: 2,
  failed: 3,
  cancelled: 4,
};

export const getPaymentStatusText = (status: number): string => {
  switch (status) {
    case 1: return 'در انتظار پرداخت';
    case 2: return 'پرداخت شده';
    case 3: return 'ناموفق';
    case 4: return 'لغو شده';
    default: return 'نامشخص';
  }
};

export const getPaymentStatusColor = (status: number): string => {
  switch (status) {
    case 1: return 'text-yellow-600 bg-yellow-50';
    case 2: return 'text-green-600 bg-green-50';
    case 3: return 'text-red-600 bg-red-50';
    case 4: return 'text-gray-600 bg-gray-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};