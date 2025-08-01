import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientMessageService } from "../services/clientMessage";

export const useClientMessages = () => {
  return useQuery({
    queryKey: ["client-messages"],
    queryFn: clientMessageService.getMessagesWithAdmin,
    refetchInterval: 3000, // refetch mỗi 3 giây
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
  });
};
