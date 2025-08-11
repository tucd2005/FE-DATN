import instanceAxios from "../utils/axios";

export interface WalletTransaction {
  id: number;
  user_id: number;
  amount: number;
  type: "deposit" | "withdrawal";
  status: "pending" | "success" | "rejected";
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    so_dien_thoai: string;
  };
}

export const walletService = {
  getTransactions: (params?: any) =>
    instanceAxios.get("/admin/wallet-transactions", { params }),

  getTransactionById: (id: number) =>
    instanceAxios.get(`/admin/wallet-transactions/${id}`),

  updateStatus: (id: number, data: any) =>
    instanceAxios.post(`/admin/wallet-transactions/${id}`, data)
  
};

