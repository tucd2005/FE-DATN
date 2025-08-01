import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "../services/chatbot";

export const useUserList = () => {
  return useQuery({
    queryKey: ["admin-users-message"],
    queryFn: messageService.getUserList,
  });
};

export const useMessagesWithUser = (userId: number) => {
  return useQuery({
    queryKey: ["messages-with-user", userId],
    queryFn: () => messageService.getMessagesWithUser(userId),
    enabled: !!userId,
    refetchInterval: 3000, // 👈 refetch mỗi 3 giây
  });
};

// Hook mới để lấy tất cả tin nhắn cho việc sắp xếp danh sách
export const useAllMessages = () => {
  return useQuery({
    queryKey: ["all-messages"],
    queryFn: messageService.getAllMessages,
    refetchInterval: 3000, // 👈 refetch mỗi 3 giây
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messageService.sendMessageToUser,
    onSuccess: (_data, variables) => {
      const receiverId = Number(variables.get("nguoi_nhan_id"));
      queryClient.invalidateQueries({
        queryKey: ["messages-with-user", receiverId],
      });
      // Invalidate tất cả tin nhắn để cập nhật danh sách
      queryClient.invalidateQueries({
        queryKey: ["all-messages"],
      });
    },
  });
};
