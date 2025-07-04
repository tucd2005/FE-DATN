
import instanceAxios from "../utils/axios";

export interface CreateOrderPayload {
  dia_chi: string;
  phuong_thuc_thanh_toan: string;
  items: {
    san_pham_id: number;
    bien_the_id: number;
    so_luong: number;
  }[];
}

export const checkoutService = {
  create: async (data: CreateOrderPayload) => {
    const res = await instanceAxios.post("/client/orders", data);
    return res.data;
  },
};

export const getOrderDetail = async (orderCode: string) => {
  const res = await instanceAxios.get(`/api/client/orders/${orderCode}`);
  return res.data.order;
};
