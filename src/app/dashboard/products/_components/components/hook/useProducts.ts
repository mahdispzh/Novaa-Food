import { productApi } from "@/src/app/dashboard/products/_components/components/api/product.api";
import { productKeys } from "@/src/app/dashboard/products/_components/components/lib/product-keys";
import { useQuery } from "@tanstack/react-query";

export function useProducts(page = 1, limit = 100) {
  return useQuery({
    queryKey: productKeys.list(page, limit),
    queryFn: () => productApi.getAll(page, limit),
  });
}
