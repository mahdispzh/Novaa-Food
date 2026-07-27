import { Category } from "@/src/app/dashboard/categories/components/categories/types/category.types";
import { CategoriesResponse } from "@/src/lib/react-query";
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export const getCategories = async () => {
  return fetcher<CategoriesResponse>(() => apiClient.get("public/categories"));
};

export type CategoryResponse = Category;

export const getCategoryById = async (categoryId: number) => {
  return fetcher<CategoryResponse>(() =>
    apiClient.get(`public/categories/${categoryId}`),
  );
};
