import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../api/product.api";
import { productKeys } from "../lib/product-keys";

type UpdateProductVariables = {
  slug: string;
  data: FormData;
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: UpdateProductVariables) =>
      productApi.update(slug, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.slug),
      });
    },
  });
}
