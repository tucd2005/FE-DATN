import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder, getOrderDetail, getOrders, orderService } from "../services/orderService";
import { toast } from "react-toastify";

// Lấy danh sách đơn hàng
export const useOrderList = (page: number = 1) => {
  return useQuery({
    queryKey: ["orders", page],
    queryFn: () =>
      orderService.getAllOrders(page).then((res) => res.data), 
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
      mutationFn: (params: { id: number; trang_thai_don_hang: string }) =>
        orderService.updateOrderStatus(params.id, { trang_thai_don_hang: params.trang_thai_don_hang }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] }); // reload list
      },
    });
  };


  // Hook lấy danh sách đơn hàng client
export const useOrders = (page = 1) => {
  return useQuery({
    queryKey: ["orders", page],
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
    mutationFn: (params: { id: number | string; ly_do_tra_hang: string }) => orderService.returnOrder(params.id, { ly_do_tra_hang: params.ly_do_tra_hang }),
    onSuccess: (data) => {
      toast.success("Trả hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
      // Trả về dữ liệu đơn hàng mới nhất cho callback
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