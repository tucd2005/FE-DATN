import { useQuery } from "@tanstack/react-query";
import instanceAxios from "../utils/axios";

export const useCategoriesClient = () => {
  return useQuery({
    queryKey: ["categories", "client"],
    queryFn: async () => {
      const res = await instanceAxios.get("/categories", {
        params: {
          per_page: 100, // Lấy tất cả danh mục
        },
      });
      return res.data?.data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 phút
    gcTime: 20 * 60 * 1000, // 20 phút
  });
};
