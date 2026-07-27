import {apiClient, fetcher} from "@/src/shared/api/fetcher";
import {ColorsResponse} from "@/src/lib/react-query";

export const getColors = async () => {
  return fetcher<ColorsResponse>(() => apiClient.get("public/colors"));
};
