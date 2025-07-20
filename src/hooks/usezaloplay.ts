import { useMutation } from "@tanstack/react-query";
import { createZaloOrder } from "../services/zaloplay";
import type { ZaloPayOrderPayload, ZaloPayOrderResponse } from "../services/zaloplay";

export const useZaloPay = () => {
  return useMutation<ZaloPayOrderResponse, Error, ZaloPayOrderPayload>({
    mutationFn: createZaloOrder,
  });
};
