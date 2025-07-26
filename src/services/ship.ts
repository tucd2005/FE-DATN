import instanceAxios from "../utils/axios";
export interface ShippingFee {
  id: number;
  tinh_thanh: string;
  gia_phi_ship: number;
}

export interface ShippingFeeResponse {
  data: ShippingFee[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
  };
}
export const shipService = {
  getShippingFee: async (province: string): Promise<number> => {
    const response = await instanceAxios.get(`/phi-ship?tinh_thanh=${province}`);
    return response.data.phi; // ví dụ { phi: 25000 }
  },
}



export const shippingFeeService = {
  getAll: async (search?: string) => {
    const { data } = await instanceAxios.get("/admin/shipping-fees", {
      params: search ? { search } : {},
    });
    return data;
  },

  update: async (id: number, phi: number) => {
    const { data } = await instanceAxios.put(`/admin/shipping-fees/${id}`, { phi });
    return data;
  },
};