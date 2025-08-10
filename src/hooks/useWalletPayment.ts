import { useMutation, useQuery } from "@tanstack/react-query";
import { walletPaymentService } from "../services/walletPaymentService";

export const usePayWithWallet = () => {
  return useMutation({
    mutationFn: (orderId: number | string) =>
      walletPaymentService.payWithWallet(orderId),
    onSuccess: (data) => {
      console.log("Wallet payment successful:", data);
    },
    onError: (error) => {
      console.error("Wallet payment failed:", error);
    },
  });
};

export const useCheckPendingPayment = () => {
  return useQuery({
    queryKey: ["pending-payment"],
    queryFn: () => walletPaymentService.checkPendingPayment(),
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchOnWindowFocus: true,
  });
};
