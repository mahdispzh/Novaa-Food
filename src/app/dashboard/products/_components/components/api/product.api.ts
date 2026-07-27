import { apiClient } from "@/src/shared/api/client";
import { Product } from "../../../_types/product.types";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
};

export const productApi = {
  // دریافت لیست محصولات (با صفحه‌بندی)
  getAll: (page: number, limit: number) =>
    apiClient.get<{ data: Product[]; meta: PaginationMeta }>(
      `protected/products?page=${page}&limit=${limit}`,
    ),

  // دریافت یک محصول با slug
  getOne: (slug: string) =>
    apiClient.get<Product>(`protected/products/${slug}`),

  // ایجاد محصول جدید (با FormData)
  create: (formData: FormData) =>
    apiClient.post<Product>("protected/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // بروزرسانی محصول با slug
  update: (slug: string, formData: FormData) =>
    apiClient.put<Product>(`protected/products/${slug}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // حذف محصول با slug
  remove: (slug: string) => apiClient.delete(`protected/products/${slug}`),
};
