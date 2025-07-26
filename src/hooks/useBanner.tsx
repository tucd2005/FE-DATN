import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bannerService } from "../services/banner";
import { toast } from "react-toastify";

export const useBannerList = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: bannerService.getAll,
    select: (res) => res.data.data, // ⚠️ đúng là `res.data.data`
  });
};
export const useCreateBanner = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: bannerService.create,
      onSuccess: () => {
        toast.success("Thêm banner thành công!");
        queryClient.invalidateQueries({ queryKey: ["banners"] });
      },
      onError: () => {
        toast.error("Thêm banner thất bại!");
      },
    });
  };

    // 🟢 Lấy chi tiết banner
    export const useBannerDetail = (id: string | number) => {
        return useQuery({
          queryKey: ["banner", id],
          queryFn: () => bannerService.getById(id),
          enabled: !!id,
        });
      };
       export const useUpdateBanner = () => {
        const queryClient = useQueryClient();
      
        return useMutation({
          mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            bannerService.update(id, data),
          onSuccess: () => {
            toast.success("Cập nhật banner thành công!");
            queryClient.invalidateQueries({ queryKey: ["banners"] });
          },
          onError: () => {
            toast.error("Cập nhật banner thất bại!");
          },
        })
    } 
    export const useDeleteBanner = () => {
        const queryClient = useQueryClient();
      
        return useMutation({
          mutationFn: (id: number) => bannerService.delete(id),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["banners"] });
          },
        });
      };