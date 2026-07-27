import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../api/product.api";
import { productKeys } from "../lib/product-keys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => productApi.remove(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}
