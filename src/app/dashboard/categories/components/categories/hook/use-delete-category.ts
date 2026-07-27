import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "../api/category.api";
import { categoryKeys } from "../lib/category-keys";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: categoryApi.remove,
    mutationFn: (id: number) => categoryApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
}
