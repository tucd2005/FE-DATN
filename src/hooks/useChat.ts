import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "../services/chatbot";

export const useUserList = () => {
  return useQuery({
    queryKey: ["admin-users-message"],
    queryFn: messageService.getUserList,
    retry: (failureCount, error: unknown) => {
      // Không retry nếu lỗi 401 (unauthorized)
      const apiError = error as { response?: { status?: number } };
      if (apiError?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useMessagesWithUser = (userId: number) => {
  return useQuery({
    queryKey: ["messages-with-user", userId],
    queryFn: () => messageService.getMessagesWithUser(userId),
    enabled: !!userId,
    refetchInterval: 3000, // 👈 refetch mỗi 3 giây
    retry: (failureCount, error: unknown) => {
      // Không retry nếu lỗi 401 (unauthorized)
      const apiError = error as { response?: { status?: number } };
      if (apiError?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
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
    },
    onError: (error) => {
      console.error("Send message error:", error);
      // Có thể thêm toast notification ở đây
    },
  });
};
