import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  clientWalletService,
  type WithdrawRequest,
  type RefundRequest,
  type PaymentRequest,
} from "../services/clientWalletService";

export const useWalletBalance = () => {
  return useQuery({
    queryKey: ["wallet-balance"],
    queryFn: () => clientWalletService.getBalance().then((res) => res.data),
  });
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WithdrawRequest) => clientWalletService.withdraw(data),
    onSuccess: () => {
      message.success("Yêu cầu rút tiền đã được gửi thành công");
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as any)?.data?.message
          : "Có lỗi xảy ra khi rút tiền";
      message.error(errorMessage);
    },
  });
};

export const useRefund = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RefundRequest) => clientWalletService.refund(data),
    onSuccess: () => {
      message.success("Hoàn tiền thành công");
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as any)?.data?.message
          : "Có lỗi xảy ra khi hoàn tiền";
      message.error(errorMessage);
    },
  });
};

export const useWalletTransactionHistory = (
  params?: Record<string, unknown>
) => {
  return useQuery({
    queryKey: ["wallet-transactions", params],
    queryFn: () =>
      clientWalletService.getTransactionHistory(params).then((res) => res.data),
  });
};

export const usePayOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PaymentRequest) => clientWalletService.payOrder(data),
    onSuccess: () => {
      message.success("Thanh toán thành công");
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as any)?.data?.message
          : "Có lỗi xảy ra khi thanh toán";
      message.error(errorMessage);
    },
  });
};
