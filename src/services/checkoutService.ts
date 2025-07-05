
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

export interface CreateOrderPayload {
  ten_nguoi_dat: string;
  dia_chi: string;
  thanh_pho: string;
  huyen: string;
  xa: string;
  so_dien_thoai: string;
  email: string;
  phuong_thuc_thanh_toan: string;
  phuong_thuc_thanh_toan_id: number;
  tong_tien: number;
  items: {
    san_pham_id: number;
    bien_the_id: number;
    ten_san_pham: string;
    hinh_anh: string;
    so_luong: number;
    don_gia: number;
    tong_tien: number;
    thuoc_tinh_bien_the: { gia_tri: string; thuoc_tinh: string }[];
  }[];
}
export const checkoutService = {
  create: async (data: CreateOrderPayload) => {
    const res = await instanceAxios.post("/client/orders", data);
    return res.data;
  },
  createVnpayPayment: async (payload: { don_hang_id: number; phuong_thuc_thanh_toan_id: number; ngon_ngu: string }) => {
    const res = await instanceAxios.post("/payment/vnpay/create", payload);
    return res.data;
  },
};

export const getOrderDetail = async (orderCode: string) => {
  const res = await instanceAxios.get(`/client/orders/${orderCode}`);
  return res.data.order;
};

export const createOrder = async (payload: any) => {
  const { data } = await instanceAxios.post("/client/orders", payload);
  return data;
};

export const createVnpayPayment = async (payload: { don_hang_id: number; phuong_thuc_thanh_toan_id: number; ngon_ngu: string }) => {
  const { data } = await instanceAxios.post("/payment/vnpay/create", payload);
  return data;
};
