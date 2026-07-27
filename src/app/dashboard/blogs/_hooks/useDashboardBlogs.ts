import { useQuery } from "@tanstack/react-query";
import { BlogsResponse, getProtectedBlogs } from "../_services/blog.api";

export const useDashboardBlogs = (page: number = 1, limit: number = 100) => {
  const query = useQuery<BlogsResponse, Error>({
    queryKey: ["dashboard-blogs", { page, limit }],
    queryFn: () => getProtectedBlogs({ page, limit }),
    staleTime: 5 * 60 * 1000, // ۵ دقیقه
    retry: 1,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
