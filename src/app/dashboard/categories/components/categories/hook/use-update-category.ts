import { useMutation, useQueryClient } from "@tanstack/react-query";
import {categoryApi, UpdateCategoryDto} from "../api/category.api";
import { categoryKeys } from "../lib/category-keys";

type UpdateCategoryVariables = {
  id: number;
  data: UpdateCategoryDto;
};
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryVariables) =>
      categoryApi.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.id),
      });
    },
  });
}
