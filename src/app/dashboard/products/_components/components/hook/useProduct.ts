import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/product.api";
import { productKeys } from "../lib/product-keys";

export function useProduct(slug?: string) {
  return useQuery({
    queryKey: productKeys.detail(slug ?? ""),
    queryFn: () => productApi.getOne(slug!),
    enabled: !!slug,
  });
}
