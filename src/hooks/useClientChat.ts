import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientMessageService } from "../services/clientMessage";

export const useClientMessages = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return useQuery({
    queryKey: ["client-messages"],
    queryFn: clientMessageService.getMessagesWithAdmin,
    enabled: isLoggedIn, // Chỉ chạy khi đã đăng nhập
    refetchInterval: isLoggedIn ? 3000 : false, // refetch mỗi 3 giây chỉ khi đã đăng nhập
    retry: (failureCount, error) => {
      // Không retry nếu lỗi 401 (unauthorized)
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useSendClientMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientMessageService.sendMessageToAdmin,
    onSuccess: () => {
      // Invalidate messages để cập nhật danh sách tin nhắn
      queryClient.invalidateQueries({
        queryKey: ["client-messages"],
      });
    },
    onError: (error) => {
      console.error("Send message error:", error);
      // Có thể thêm toast notification ở đây
    },
  });
};
