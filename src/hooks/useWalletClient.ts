import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  walletClientService,
  type WalletBalance,
  type WalletTransactionClient,
  type DepositRequest,
  type WithdrawRequest,
  type DepositResponse,
  type PendingTransactionResponse,
} from "../services/walletClientService";

// Hook lấy số dư ví
export const useWalletBalance = () => {
  return useQuery<WalletBalance>({
    queryKey: ["wallet-balance"],
    queryFn: () =>
      walletClientService.getBalance().then((res) => {
        const { transactions, ...balanceData } = res.data.data;
        return balanceData as WalletBalance;
      }),
    staleTime: 30000, // Cache 30 giây
  });
};

// Hook nạp tiền vào ví
export const useWalletDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation<DepositResponse, Error, DepositRequest>({
    mutationFn: (data: DepositRequest) =>
      walletClientService.deposit(data).then((res) => res.data),
    onSuccess: (data) => {
      message.success("Tạo giao dịch nạp tiền thành công");
      // Mở URL thanh toán trong tab mới
      if (data.data.payment_url) {
        window.open(data.data.payment_url, "_blank");
      }
      // Invalidate balance query để cập nhật số dư
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      // Invalidate transactions query để cập nhật lịch sử
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi nạp tiền"
      );
    },
  });
};

// Hook rút tiền từ ví
export const useWalletWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WithdrawRequest) =>
      walletClientService.withdraw(data).then((res) => res.data),
    onSuccess: () => {
      message.success("Yêu cầu rút tiền đã được gửi, vui lòng chờ admin duyệt");
      // Invalidate balance query để cập nhật số dư
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      // Invalidate transactions query để cập nhật lịch sử
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi rút tiền"
      );
    },
  });
};

// Hook kiểm tra giao dịch đang chờ
export const useCheckPendingTransaction = () => {
  return useQuery<PendingTransactionResponse>({
    queryKey: ["wallet-pending-transaction"],
    queryFn: () =>
      walletClientService.checkPendingTransaction().then((res) => res.data),
    refetchInterval: 10000, // Kiểm tra mỗi 10 giây
    refetchIntervalInBackground: true,
  });
};

// Hook lấy lịch sử giao dịch
export const useWalletTransactions = () => {
  return useQuery<WalletTransactionClient[]>({
    queryKey: ["wallet-transactions"],
    queryFn: () =>
      walletClientService
        .getTransactions()
        .then((res) => res.data.data.transactions || []),
    staleTime: 30000, // Cache 30 giây
  });
};

// Hook refresh số dư ví
export const useRefreshWalletBalance = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
  };
};
