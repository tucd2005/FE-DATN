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

export interface DepositRequest {
  amount: number;
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
  // Lấy số dư ví - endpoint thực tế: /wallet
  getBalance: () => instanceAxios.get("/wallet"),

  // Lấy lịch sử giao dịch - endpoint này bị comment trong backend
  // getTransactions: (params?: TransactionFilters) =>
  //   instanceAxios.get("/wallet/transactions", { params }),

  // Nạp tiền vào ví - endpoint thực tế: /wallet/deposit
  deposit: (data: DepositRequest) =>
    instanceAxios.post("/wallet/deposit", data),

  // Rút tiền từ ví - endpoint thực tế: /wallet/withdraw
  withdraw: (data: WithdrawRequest) =>
    instanceAxios.post("/wallet/withdraw", data),

  // Hoàn tiền vào ví - endpoint này bị comment trong backend
  // refund: (data: { order_id: number; amount: number }) =>
  //   instanceAxios.post("/wallet/refund", data),
};
