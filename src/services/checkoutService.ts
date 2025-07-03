
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
  create: async (data: any) => {
    const res = await instanceAxios.post("/client/orders", data);
    return res.data;
  },
};

