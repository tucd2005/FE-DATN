import axios from "../utils/axios";

export interface CartItemAPI {
  id: number;
  san_pham_id: number;
  ten_san_pham: string;
  hinh_anh: string;
  so_luong: number;
  gia_san_pham: number;
  thanh_tien: number;
  bien_the: {
    id: number;
    thuoc_tinh: Array<{
      ten_thuoc_tinh: string;
      gia_tri: string;
    }>;
  } | null;
}

export interface CartResponse {
  message: string;
  data: {
    items: CartItemAPI[];
    tong_tien: number;
    tong_so_luong: number;
  };
}

export interface AddToCartRequest {
  san_pham_id: number;
  so_luong: number;
  bien_the_id?: number;
}

export interface UpdateQuantityRequest {
  so_luong: number;
  action?: "replace" | "add";
}

export const cartService = {
  // Lấy danh sách giỏ hàng
  getCart: async (): Promise<CartResponse> => {
    const response = await axios.get("/cart");
    return response.data;
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (data: AddToCartRequest): Promise<{ message: string }> => {
    const response = await axios.post("/cart/add", data);
    return response.data;
  },

  // Cập nhật số lượng sản phẩm
  updateQuantity: async (
    id: number,
    data: UpdateQuantityRequest
  ): Promise<{
    message: string;
    data: { so_luong: number; thanh_tien: number; action: string };
  }> => {
    const response = await axios.put(`/cart/update/${id}`, data);
    return response.data;
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeItem: async (id: number): Promise<{ message: string }> => {
    const response = await axios.delete(`/cart/remove/${id}`);
    return response.data;
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async (): Promise<{ message: string }> => {
    const response = await axios.delete("/cart/clear");
    return response.data;
  },
};
