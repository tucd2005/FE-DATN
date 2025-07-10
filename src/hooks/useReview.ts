import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReviewDetail, getReviews, hideReview } from "../services/reviewService";
import { toast } from "react-toastify";


export const useReviewList = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
};
export const useReviewDetail = (id: number) => {
    return useQuery({
      queryKey: ["review", id],
      queryFn: () => getReviewDetail(id),
      enabled: !!id,
    });
  };
  
  export const useHideReview = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: hideReview,
      onSuccess: () => {
        // Invalidate lại list
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
        // Hiển thị thông báo thành công
        toast.success("Ẩn bình luận thành công!");
      },
      onError: () => {
        toast.error(
          
     "Ẩn bình luận thất bại. Vui lòng thử lại.",
        );
      }
    });
  };
