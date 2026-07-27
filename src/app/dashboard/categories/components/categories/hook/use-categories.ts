import {useQuery} from "@tanstack/react-query";
import { categoryApi } from "../api/category.api";
import { categoryKeys } from "../lib/category-keys";

export function useCategories(page = 1, limit = 10) {
  return useQuery({
    queryKey: categoryKeys.list(page, limit),
    queryFn: () => categoryApi.getAll(page, limit),
  });
}
