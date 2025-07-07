import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrderDetail, getOrders, orderService } from "../services/orderService";

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