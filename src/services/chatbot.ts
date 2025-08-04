import type { Message as ChatMessage } from "../types/message.type";
import type { User } from "../types/message.type";
import instanceAxios from "../utils/axios";

export const messageService = {
  getUserList: async (): Promise<User[]> => {
    try {
      const res = await instanceAxios.get("/admin/tin-nhans");
      return res.data.data || [];
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  },

  getMessagesWithUser: async (userId: number): Promise<ChatMessage[]> => {
    try {
      if (!userId) {
        return [];
      }
      const res = await instanceAxios.get(`/admin/tin-nhans/${userId}`);
      return res.data.data || [];
    } catch (error) {
      console.error("Error fetching messages with user:", error);
      throw error;
    }
  },

  getAllMessages: async (): Promise<ChatMessage[]> => {
    try {
      const res = await instanceAxios.get("/admin/tin-nhans");
      return res.data.data || [];
    } catch (error) {
      console.error("Error fetching all messages:", error);
      throw error;
    }
  },

  sendMessageToUser: async (data: FormData): Promise<ChatMessage> => {
    try {
      // Validate data
      const nguoiNhanId = data.get("nguoi_nhan_id");
      const noiDung = data.get("noi_dung");
      const tepDinhKem = data.get("tep_dinh_kem");

      if (!nguoiNhanId) {
        throw new Error("ID người nhận không được để trống");
      }

      if (!noiDung && !tepDinhKem) {
        throw new Error("Tin nhắn không được để trống");
      }

      const res = await instanceAxios.post("/admin/tin-nhans", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};
