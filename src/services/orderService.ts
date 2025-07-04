
import instanceAxios from "../utils/axios";

export const orderService = {
  // Lấy danh sách đơn hàng
  getAllOrders: () => instanceAxios.get("/admin/orders"), // trả về { data: [...] }


  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: (id: number, data: { trang_thai_don_hang: string }) =>
    instanceAxios.put(`/admin/orders/${id}`, data),
  getOrderById: (id: number) =>
    instanceAxios.get(`/admin/orders/${id}`).then((res) => res.data),


};
