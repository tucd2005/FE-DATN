// src/hooks/useCheckout.ts
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { checkoutService, type CreateOrderPayload } from "../services/checkoutService";

export const useCheckout = () => {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => checkoutService.create(payload),
    onSuccess: () => {
      toast.success("Đặt hàng thành công!");
      // Xử lý sau khi đặt hàng thành công (ví dụ: chuyển trang, reset giỏ hàng...)
    },
    onError: (error: unknown) => {
      if (error && typeof error === 'object' && 'response' in error) {
       
        toast.error(error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng!");
      } else {
        toast.error("Có lỗi xảy ra khi đặt hàng!");
      }
    },
  });
};
