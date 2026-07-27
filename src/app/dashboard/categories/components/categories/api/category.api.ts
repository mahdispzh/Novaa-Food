import { apiClient } from "@/src/shared/api/client";
import { Category } from "../types/category.types";

export type CreateCategoryDto = {
  name: string;
  slug?: string | undefined;
  image?: string | undefined;
  parentId: number | null;
};

export type UpdateCategoryDto = CreateCategoryDto;

export const categoryApi = {
  getAll: (page = 1, limit = 10) =>
    apiClient.get<{ data: Category[]; meta: any }>(
      `protected/categories?page=${page}&limit=${limit}`,
    ),

  getOne: (id: number) => apiClient.get<Category>(`protected/categories/${id}`),

  create: (data: CreateCategoryDto) =>
    apiClient.post<Category>("protected/categories", data),

  update: (id: number, data: UpdateCategoryDto) =>
    apiClient.put<Category>(`protected/categories/${id}`, data),

  remove: (id: number) =>
    apiClient.delete<{ success: boolean }>(`protected/categories/${id}`),
};
