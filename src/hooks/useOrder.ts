import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../services/orderService";

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
