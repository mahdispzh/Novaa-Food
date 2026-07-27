import { useQuery } from "@tanstack/react-query";
import { getAdminOverview } from "../_services/admin-overview.api";

export const useAdminOverview = () => {
  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: getAdminOverview,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
