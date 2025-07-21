
import instanceAxios from "../utils/axios";


export const shipService = {
    getShippingFee: async (province: string): Promise<number> => {
      const response = await instanceAxios.get(`/phi-ship?tinh_thanh=${province}`);
      return response.data.phi; // assume BE trả về { phi: number }
    },
  };