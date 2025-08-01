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
  wallet_id: number;
  user_id: number;
  type: "deposit" | "withdraw" | "payment" | "refund";
  amount: number;
  status: "pending" | "success" | "rejected";
  bank_name?: string;
  bank_account?: string;
  acc_name?: string;
  description?: string;
  rejection_reason?: string;
  related_order_id?: number;
  created_at: string;
  updated_at: string;
}

export interface WithdrawRequest {
  amount: number;
  bank_name: string;
  bank_account: string;
  acc_name: string;
}

export interface TransactionFilters {
  type?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  keyword?: string;
  page?: number;
}

export const clientWalletService = {
  // Lấy số dư ví
  getBalance: () => instanceAxios.get("/client/wallet/balance"),

  // Lấy lịch sử giao dịch
  getTransactions: (params?: TransactionFilters) =>
    instanceAxios.get("/client/wallet/transactions", { params }),

  // Rút tiền từ ví
  withdraw: (data: WithdrawRequest) =>
    instanceAxios.post("/client/wallet/withdraw", data),

  // Hoàn tiền vào ví
  refund: (data: { order_id: number; amount: number }) =>
    instanceAxios.post("/client/wallet/refund", data),
};
