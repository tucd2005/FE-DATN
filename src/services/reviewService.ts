import instanceAxios from "../utils/axios";

// Lấy danh sách đánh giá
export const getReviews = async () => {
  const res = await instanceAxios.get("/admin/reviews?page=${page}");
  return res.data; // trả về data, thường backend sẽ trả dạng { data: [...] }
};
export const getReviewDetail = async (id: number) => {
  const res = await instanceAxios.get(`/admin/reviews/${id}`);
  return res.data;
};

// Ẩn bình luận (giả sử update status hoặc xóa)
export const hideReview = async (id: number) => {
  const res = await instanceAxios.patch(
    `/admin/reviews/${id}/toggle-visibility`
  );
  return res.data;
};

// Lấy đánh giá sản phẩm theo id (client)
export const getProductReviews = async (productId: number) => {
  const res = await instanceAxios.get(`/products/${productId}/review`);
  return res.data;
};

// Gửi đánh giá mới (client)
export const submitReview = async (formData: FormData) => {
  const res = await instanceAxios.post("/review", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


export const getLatestFiveStarReviews = async (limit: number = 10) => {
  const res = await instanceAxios.get(`/reviews/ds-moi-nhat`, {
    params: { limit }
  });
  return res.data.data; // lấy mảng reviews từ BE
};