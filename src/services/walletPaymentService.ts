import instanceAxios from "../utils/axios";

export interface WalletPaymentResponse {
  message: string;
  order: any;
  transaction: any;
  wallet_balance?: number;
}

export interface PendingPaymentResponse {
  status: "need_payment" | "ok";
  message: string;
  order_id?: number;
  ma_don_hang?: string;
  payment_link?: string;
  expires_at?: string;
  amount?: number;
  trang_thai_thanh_toan?: string;
}

export const walletPaymentService = {
  // Thanh toán đơn hàng bằng ví
  payWithWallet: async (
    orderId: number | string
  ): Promise<WalletPaymentResponse> => {
    const { data } = await instanceAxios.post<WalletPaymentResponse>(
      `/client/orders/pay-with-wallet/${orderId}`
    );
    return data;
  },

  // Kiểm tra đơn hàng chờ thanh toán
  checkPendingPayment: async (): Promise<PendingPaymentResponse> => {
    const res = await instanceAxios.get<PendingPaymentResponse>(
      "/client/orders/check-pending-payment",
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
};
