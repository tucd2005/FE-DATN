import instanceAxios from "../utils/axios";

export interface ZaloPayOrderPayload {
  don_hang_id: number;
  phuong_thuc_thanh_toan_id: number;
}

export interface ZaloPayOrderResponse {
  pay_url: string;
  don_hang_id: number;
  expires_at: string;
}

export const createZaloOrder = async (orderData: ZaloPayOrderPayload): Promise<ZaloPayOrderResponse> => {
  const response = await instanceAxios.post("/payment/zalopay/create", orderData);
  return response.data;
};
