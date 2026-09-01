// src/app/profile/addresses/_services/address.api.ts

"use client";

import { useAuthStore } from "@/src/shared/store/store";
import type { 
  Address, 
  AddressFormData, 
  AddressesResponse, 
  SuccessResponse,
  UserData 
} from "../_types/address.types";

class AddressService {
  private getHeaders(): HeadersInit {
    const token = useAuthStore.getState().accessToken;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    console.log(`📡 پاسخ دریافت شد: ${response.status}`);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `خطا: ${response.status}`);
    }
    
    return response.json();
  }

  // ✅ دریافت اطلاعات کاربر از API
  async getUserInfo(): Promise<UserData> {
    console.log("📡 دریافت اطلاعات کاربر");
    
    const response = await fetch('/api/protected/users/me', {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<UserData>(response);
  }

  // ✅ دریافت لیست آدرس‌ها
  async getAddresses(page = 1, limit = 10): Promise<AddressesResponse> {
    console.log(`📡 دریافت آدرس‌ها - صفحه ${page}`);
    
    const response = await fetch(
      `/api/protected/addresses?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: this.getHeaders(),
      }
    );

    return this.handleResponse<AddressesResponse>(response);
  }

 
  
  

  // ✅ تنظیم آدرس پیش‌فرض
  async setDefaultAddress(id: number): Promise<Address> {
    console.log(`📡 تنظیم آدرس ${id} به عنوان پیش‌فرض`);
    
    const response = await fetch(`/api/protected/addresses/${id}/default`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    });

    return this.handleResponse<Address>(response);
  }
}

export const addressService = new AddressService();