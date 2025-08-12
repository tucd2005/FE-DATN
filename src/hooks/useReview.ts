import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReviewDetail,
  getReviews,
  getReviewss,
  hideReview,
  getProductReviews,
  submitReview,
  getReviewsByProduct,
  getLatestFiveStarReviews,
} from "../services/reviewService";
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
      toast.error("Ẩn bình luận thất bại. Vui lòng thử lại.");
    },
  });
};

// Lấy danh sách đánh giá sản phẩm (client)
export const useProductReviews = (productId: number) => {
  return useQuery({
    queryKey: ["productReviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

// Gửi đánh giá mới (client)
export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitReview,
    onSuccess: (_, variables) => {
      // Lấy productId từ formData
      const productId = variables.get("san_pham_id");
      queryClient.invalidateQueries(["productReviews", Number(productId)]);
    },
  });
};


// Hook cho React Query
export const useLatestFiveStarReviews = (limit: number = 10) => {
  return useQuery({
    queryKey: ["latest-five-star-reviews", limit],
    queryFn: () => getLatestFiveStarReviews(limit)
  });
}