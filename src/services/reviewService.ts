
import instanceAxios from "../utils/axios";

// Lấy danh sách đánh giá
export const getReviews = async () => {
  const res = await instanceAxios.get("/admin/reviews");
  return res.data; // trả về data, thường backend sẽ trả dạng { data: [...] }
};
export const getReviewDetail = async (id: number) => {
    const res = await instanceAxios.get(`/admin/reviews/${id}`);
    return res.data;
  };
  
  // Ẩn bình luận (giả sử update status hoặc xóa)
  export const hideReview = async (id: number) => {
    const res = await instanceAxios.patch(`/admin/reviews/${id}/toggle-visibility`);
    return res.data;
  };