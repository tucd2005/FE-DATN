import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { message } from "antd";
import { walletService, type WalletTransaction } from "../services/walletService";

export const useWalletTransactionList = (params?: any) => {
  return useQuery({
    queryKey: ["wallet-transactions", params],
    queryFn: () => walletService.getTransactions(params).then((res) => res.data),
  });
};

export const useWalletTransactionDetail = (id: number) => {
  return useQuery<WalletTransaction>({
    queryKey: ["wallet-transaction", id],
    queryFn: () => walletService.getTransactionById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useUpdateWalletStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { status: string; rejection_reason?: string };
    }) => walletService.updateStatus(id, data),
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });
};

