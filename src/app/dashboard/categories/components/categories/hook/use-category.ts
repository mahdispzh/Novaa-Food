import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../api/category.api";
import { categoryKeys } from "../lib/category-keys";

export function useCategory(id?: number) {
  return useQuery({
    queryKey: categoryKeys.detail(id ?? 0),
    queryFn: () => categoryApi.getOne(id!),
    enabled: !!id,
  });
}

/*
export function useCategory(id?: number) {
  return useQuery({
    queryKey: categoryKeys.detail(id ?? 0),
    queryFn: async () => {
      const res = await categoryApi.getOne(id!);
      return res.data;
    },
    enabled: !!id,
  });
}*/
