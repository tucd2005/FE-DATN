
import instanceAxios from "../utils/axios";

interface CreateDiscountCodePayload {
    id?: number; // optional for create, required for update
  ma: string;
  ten: string;
  loai: string;                // "phan_tram" | "tien_mat"
  ap_dung_cho: string;        // "toan_don" | "san_pham"
  san_pham_id?: number | null;
  gia_tri: number;
  gia_tri_don_hang: number;
  // so_luong: number;
  gioi_han: number;
  trang_thai: boolean;
  ngay_bat_dau: string;       // ISO format: "2025-07-01 00:00:00"
  ngay_ket_thuc: string;
}

export const createDiscountCode = async (payload: CreateDiscountCodePayload) => {
  const response = await instanceAxios.post("/admin/discount-codes", payload);
  return response.data; // sẽ trả về { message, data }
};
// Gọi API lấy danh sách mã giảm giá (kèm phân trang)
export const getDiscountCodes = async (page = 1) => {
  const response = await instanceAxios.get(`/admin/discount-codes?page=${page}`);
  return response.data;
};

export const updateDiscountCode = async (payload: CreateDiscountCodePayload) => {
  const res = await instanceAxios.put(`/admin/discount-codes/${payload.id}`, payload);
  return res.data; // { message, data }
};
export const getDiscountCodeDetail = async (id: number) => {
  const res = await instanceAxios.get(`/admin/discount-codes/${id}`);
  return res.data.data; // Trả về data bên trong key "data"
};

export const updateDiscountCodeStatus = async (id: number, status: boolean) => {
  const res = await instanceAxios.patch(`/admin/discount-codes/${id}/status`, {
    trang_thai: status
  });
  return res.data.data;
};
// Xóa mềm (update trạng thái deleted_at)
export const softDeleteDiscountCode = async (id: number) => {
  const res = await instanceAxios.delete(`/admin/discount-codes/${id}`);
  return res.data.data;
};

// Lấy danh sách mã giảm giá đã xóa mềm
export const getDeletedDiscountCodes = async (page: number) => {
  const res = await instanceAxios.get(`/admin/discount-codes/trash/list?page=${page}`);
  return res.data;
};
export const restoreDiscountCode = async (id: number) => {
  const res = await instanceAxios.post(`/admin/discount-codes/restore/${id}`);
  return res.data.data;
};

export const sendDiscountCode = (id: number, payload: { kieu: string; so_luong?: number }) => {

  return instanceAxios.post(`/admin/discount-codes/${id}/send`, payload);
};

export const discountCodeService = {
  check: (payload: { ma_giam_gia: string; tong_tien: number; san_pham_id?: number }) =>
    instanceAxios.post("/client/discount-code/check", payload),

  getUserDiscounts: () =>
    instanceAxios.get("/client/discount-codes"),
};

