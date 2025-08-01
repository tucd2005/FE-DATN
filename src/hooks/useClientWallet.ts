import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  clientWalletService,
  type Wallet,
  type WithdrawRequest,
  type TransactionFilters,
} from "../services/clientWalletService";

// Hook lấy số dư ví
export const useWalletBalance = () => {
  return useQuery<Wallet>({
    queryKey: ["wallet-balance"],
    queryFn: () => clientWalletService.getBalance().then((res) => res.data),
  });
};

// Hook lấy lịch sử giao dịch
export const useWalletTransactions = (filters?: TransactionFilters) => {
  return useQuery({
    queryKey: ["wallet-transactions", filters],
    queryFn: () =>
      clientWalletService.getTransactions(filters).then((res) => res.data),
  });
};

// Hook rút tiền từ ví
export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WithdrawRequest) => clientWalletService.withdraw(data),
    onSuccess: () => {
      message.success("Yêu cầu rút tiền đã được gửi, vui lòng chờ admin duyệt");
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Có lỗi xảy ra khi rút tiền";
      message.error(errorMessage);
    },
  });
};

// Hook hoàn tiền vào ví
export const useRefund = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { order_id: number; amount: number }) =>
      clientWalletService.refund(data),
    onSuccess: () => {
      message.success("Hoàn tiền thành công");
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Có lỗi xảy ra khi hoàn tiền";
      message.error(errorMessage);
    },
  });
};
