import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder, checkPendingPayment, getOrderDetail, getOrders, orderService } from "../services/orderService";
import { toast } from "react-toastify";

// Interface cho tham số lọc
interface OrderListParams {
  page?: number;
  search?: string;
  status?: string;
  paymentStatus?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Lấy danh sách đơn hàng
export const useOrderList = (page: number = 1, filters: any = {}) => {
  return useQuery({
    queryKey: ["orders", page, filters],
    queryFn: () =>
      orderService.getAllOrders(page, filters).then((res) => res.data),
  });
};


export const useOrderDetail = (id: number) => {
    return useQuery({
      queryKey: ["order", id],
      queryFn: () => orderService.getOrderById(id), 
      enabled: !!id, // chỉ chạy khi có id
    });
  };


export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      id: number;
      trang_thai_don_hang: string;
      ly_do_tu_choi_tra_hang?: string;
    }) =>
      orderService.updateOrderStatus(params.id, {
        trang_thai_don_hang: params.trang_thai_don_hang,
        ...(params.ly_do_tu_choi_tra_hang && {
          ly_do_tu_choi_tra_hang: params.ly_do_tu_choi_tra_hang,
        }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Làm mới danh sách
    },
  });
};

  // Hook lấy danh sách đơn hàng client
export const useOrders = (page = 1) => {
  return useQuery({
    queryKey: ["client-orders", page],
    queryFn: () => getOrders(page),
  });
};

export const useOrderDetailclient = (orderId: number | string) => {
  return useQuery({
  queryKey: ["order-detail", orderId],
  queryFn: () => getOrderDetail(orderId),
})
}

// Hook hủy đơn hàng (client)
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: number | string; ly_do_huy: string }) => orderService.cancelOrder(params.id, { ly_do_huy: params.ly_do_huy }),
    onSuccess: (data) => {
      toast.success("Hủy đơn hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
      // Trả về dữ liệu đơn hàng mới nhất cho callback
      return data;
    },
  });
};

// Hook trả hàng (client)
export const useReturnOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: number | string; data: FormData }) =>
      orderService.returnOrder(params.id, params.data),
    onSuccess: (data) => {
      toast.success("Trả hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
      return data;
    },
  });
};

// Hook xác nhận đã nhận hàng (client)
export const useMarkOrderAsDelivered = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: number | string) => orderService.markOrderAsDelivered(orderId),
    onSuccess: (data) => {
      toast.success("Xác nhận đã nhận hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
      return data;
    },
  });
};

export function useCancelOrderadmin() {
  return useMutation({
    mutationFn: ({ id, ly_do_huy }: { id: number; ly_do_huy: string }) =>
  cancelOrder(id, ly_do_huy),

  });
}
///quay lại thanh toán đơn hàng vnplay
export const usePendingPayment = () => {
  return useQuery({
    queryKey: ["pendingPayment"],
    queryFn: checkPendingPayment,
    refetchOnWindowFocus: false,
  });
};