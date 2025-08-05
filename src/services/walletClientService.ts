import instanceAxios from "../utils/axios";

export interface WalletBalance {
  id: number;
  user_id: number;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface WalletTransactionClient {
  id: number;
  user_id: number;
  wallet_id: number;
  transaction_code: string;
  amount: number;
  type: "deposit" | "withdraw";
  status: "pending" | "success" | "rejected";
  description: string;
  bank_name?: string;
  bank_account?: string;
  acc_name?: string;
  payment_url?: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface DepositRequest {
  amount: number;
}

export interface WithdrawRequest {
  amount: number;
  bank_name: string;
  bank_account: string;
  acc_name: string;
}

export interface DepositResponse {
  status: string;
  message: string;
  data: {
    transaction_code: string;
    amount: number;
    status: string;
    payment_url: string;
  };
}

export interface PendingTransactionResponse {
  status: string;
  message: string;
  data?: {
    transaction_code: string;
    amount: number;
    expires_at: string;
    payment_url: string;
  };
}

export const walletClientService = {
  // Lấy số dư ví và transactions
  getBalance: () =>
    instanceAxios.get<{
      data: WalletBalance & { transactions: WalletTransactionClient[] };
    }>("/wallet"),

  // Lấy lịch sử giao dịch (sử dụng API wallet để lấy transactions)
  getTransactions: () =>
    instanceAxios.get<{ data: { transactions: WalletTransactionClient[] } }>(
      "/wallet"
    ),

  // Nạp tiền vào ví
  deposit: (data: DepositRequest) =>
    instanceAxios.post<DepositResponse>("/wallet/deposit", data, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }),

  // Rút tiền từ ví
  withdraw: (data: WithdrawRequest) =>
    instanceAxios.post<WalletTransactionClient>("/wallet/withdraw", data),

  // Kiểm tra giao dịch đang chờ
  checkPendingTransaction: () =>
    instanceAxios.get<PendingTransactionResponse>("/wallet/check-pending"),
};
