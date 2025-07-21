
import instanceAxios from "../utils/axios";
export interface ThuocTinhBienThe {
  thuoc_tinh_id: number
  ten_thuoc_tinh: string
  gia_tri: string
}

export interface OrderItem {
  san_pham_id: number
  ten_san_pham: string
  hinh_anh: string
  bien_the_id: number
  thuoc_tinh_bien_the: ThuocTinhBienThe[]
  so_luong: number
  don_gia: string
  tong_tien: string
}

export interface Order {
  id: number
  ma_don_hang: string
  trang_thai_don_hang: string
  trang_thai_thanh_toan: string
  tong_tien_thanh_toan: number
  ngay_dat: string
  phuong_thuc_thanh_toan: string
  so_luong_mat_hang: number
  items: OrderItem[]
}

export interface Pagination {
  total: number
  per_page: number
  current_page: number
  last_page: number
}

export interface GetOrdersResponse {
  orders: Order[]
  pagination: Pagination
}

export const orderService = {
  // Lấy danh sách đơn hàng
  // getAllOrders: () => instanceAxios.get("/admin/orders"), // trả về { data: [...] }
  getAllOrders: (page = 1) => {
  return instanceAxios.get(`admin/orders?page=${page}`);
  },


  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: (id: number, data: { trang_thai_don_hang: string }) =>
    instanceAxios.put(`/admin/orders/${id}`, data),
  getOrderById: (id: number) =>
    instanceAxios.get(`/admin/orders/${id}`).then((res) => res.data),

  // Hủy đơn hàng (client)
  cancelOrder: async (orderId: number | string, body?: { ly_do_huy: string }) => {
    const res = await instanceAxios.post(`/order/huy-don/${orderId}`, body);
    return res.data;
  },

  // Trả hàng (client)
  returnOrder: async (orderId: number | string, body?: { ly_do_tra_hang: string }) => {
    const res = await instanceAxios.post(`/order/tra-hang/${orderId}`, body);
    return res.data;
  },

  // Đánh dấu đã giao (admin)
  markOrderAsDelivered: (orderId: number | string) =>
    instanceAxios.post(`/order/da-giao/${orderId}`),



};

// API lấy danh sách đơn hàng (có thể truyền params page, per_page nếu backend hỗ trợ)
export const getOrders = async (page = 1): Promise<GetOrdersResponse> => {
  const res = await instanceAxios.get(`/client/orders`, {
    params: { page }
  })
  return res.data
}

// Lấy chi tiết đơn hàng theo ID hoặc mã đơn hàng
export const getOrderDetail = async (orderId: number | string) => {
  const { data } = await instanceAxios.get(`/client/orders/${orderId}`)
  return data
}