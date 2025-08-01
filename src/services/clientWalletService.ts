import instanceAxios from "../utils/axios";

export interface Wallet {
  id: number;
  user_id: number;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: number;
  user_id: number;
  wallet_id: number;
  type: "deposit" | "withdraw";
  amount: number;
  status: "pending" | "success" | "rejected";
  bank_name?: string;
  bank_account?: string;
  acc_name?: string;
  description?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface WithdrawRequest {
  amount: number;
  bank_name: string;
  bank_account: string;
  acc_name: string;
}

export interface RefundRequest {
  order_id: number;
  amount: number;
}

export interface PaymentRequest {
  order_id: number;
  amount: number;
  payment_method: "wallet" | "card" | "bank";
}

export const clientWalletService = {
  // Lấy số dư ví
  getBalance: () => instanceAxios.get("/client/wallet/balance"),

  // Rút tiền
  withdraw: (data: WithdrawRequest) =>
    instanceAxios.post("/client/wallet/withdraw", data),

  // Hoàn tiền
  refund: (data: RefundRequest) =>
    instanceAxios.post("/client/wallet/refund", data),

  // Lấy lịch sử giao dịch của user
  getTransactionHistory: (params?: Record<string, unknown>) =>
    instanceAxios.get("/client/wallet/transactions", { params }),

  // Thanh toán đơn hàng
  payOrder: (data: PaymentRequest) =>
    instanceAxios.post("/client/wallet/pay", data),
};
