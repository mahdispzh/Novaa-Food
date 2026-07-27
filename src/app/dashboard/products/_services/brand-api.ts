import { BrandResponse, BrandsResponse } from "@/src/lib/react-query";
import { apiClient } from "@/src/shared/api/client";
import { fetcher } from "@/src/shared/api/fetcher";

export const getBrands = async () => {
  return fetcher<BrandsResponse>(() => apiClient.get("public/brands"));
};

export const getBrandById = async (brandId: number) => {
  return fetcher<BrandResponse>(() =>
    apiClient.get(`public/brands/${brandId}`),
  );
};
