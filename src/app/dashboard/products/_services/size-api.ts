import { SizesResponse } from "@/src/lib/react-query";
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export const getSizes = async () => {
  return fetcher<SizesResponse>(() => apiClient.get("public/sizes"));
};
