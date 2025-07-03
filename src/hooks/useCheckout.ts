// src/hooks/useCheckout.ts
import { useMutation } from "@tanstack/react-query";
import { checkoutService, type CreateOrderPayload } from "../services/checkoutService";
import { toast } from "react-toastify";

export const useCheckout = () => {
  return useMutation({
    mutationFn: checkoutService.create,
    onSuccess: (data) => {
      toast.success("Đặt hàng thành công!");
      console.log("Order response:", data);
      // TODO: Reset giỏ hàng hoặc điều hướng sang trang cảm ơn nếu cần
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi đặt hàng!");
    },
  });
};
