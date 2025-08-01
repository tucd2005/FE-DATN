import type { Message as ChatMessage } from "../types/message.type";
import type { User } from "../types/message.type";
import instanceAxios from "../utils/axios"; // hoặc axios instance của bạn

export const messageService = {
  getUserList: async (): Promise<User[]> => {
    const res = await instanceAxios.get("/admin/tin-nhans");
    return res.data.data;
  },

  getMessagesWithUser: async (userId: number): Promise<ChatMessage[]> => {
    const res = await instanceAxios.get(`/admin/tin-nhans/${userId}`);
    return res.data.data;
  },

  getAllMessages: async (): Promise<ChatMessage[]> => {
    const res = await instanceAxios.get("/admin/tin-nhans/all");
    return res.data.data;
  },

  sendMessageToUser: async (data: FormData): Promise<ChatMessage> => {
    const res = await instanceAxios.post("/admin/tin-nhans", data);
    return res.data.data;
  },
};
