// src/hooks/useCheckout.ts
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { checkoutService, type CreateOrderPayload } from "../services/checkoutService";
import instanceAxios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const nav= useNavigate();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => checkoutService.create(payload),
    onSuccess: () => {
      toast.success("Đặt hàng thành công!");
      nav('/')
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

export const useOrderDetail = (orderCode: string) => {
  return useQuery({
    queryKey: ["order", orderCode],
    queryFn: () => getOrderDetail(orderCode),
    enabled: !!orderCode, // chỉ gọi khi có orderCode
  });
};