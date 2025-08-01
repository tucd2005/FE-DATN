import type { ClientMessage } from "../types/clientMessage.type";
import instanceAxios from "../utils/axios";

export const clientMessageService = {
  getMessagesWithAdmin: async (): Promise<ClientMessage[]> => {
    const res = await instanceAxios.get("/client/tin-nhans");
    return res.data.data;
  },

  sendMessageToAdmin: async (data: FormData): Promise<ClientMessage> => {
    const res = await instanceAxios.post("/client/tin-nhans", data);
    return res.data.data;
  },
};
