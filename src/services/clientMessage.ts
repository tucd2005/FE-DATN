import type { ClientMessage } from "../types/clientMessage.type";
import instanceAxios from "../utils/axios";

export const clientMessageService = {
  getMessagesWithAdmin: async (): Promise<ClientMessage[]> => {
    try {
      const res = await instanceAxios.get("/tin-nhans");
      return res.data.data || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  sendMessageToAdmin: async (data: FormData): Promise<ClientMessage> => {
    try {
      // Validate data
      const noiDung = data.get("noi_dung");
      const tepDinhKem = data.get("tep_dinh_kem");

      if (!noiDung && !tepDinhKem) {
        throw new Error("Tin nhắn không được để trống");
      }

      const res = await instanceAxios.post("/tin-nhans", data, {
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
