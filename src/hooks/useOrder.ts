import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrderDetail, getOrders, orderService, cancelOrder, returnOrder } from "../services/orderService";

// Lấy danh sách đơn hàng
export const useOrderList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getAllOrders().then(res => res.data.data), // <-- res.data.data mới là mảng
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

// Hook để hủy đơn hàng
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderId: number | string) => cancelOrder(orderId),
    onSuccess: (data, orderId) => {
      // Invalidate và refetch order detail
      queryClient.invalidateQueries({ queryKey: ["order-detail", orderId] });
      // Invalidate danh sách đơn hàng
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Hook để trả hàng
export const useReturnOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderId: number | string) => returnOrder(orderId),
    onSuccess: (data, orderId) => {
      // Invalidate và refetch order detail
      queryClient.invalidateQueries({ queryKey: ["order-detail", orderId] });
      // Invalidate danh sách đơn hàng
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};