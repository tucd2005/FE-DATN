import { create } from "zustand";
import {
  cartService,
  type CartItemAPI,
  type AddToCartRequest,
} from "../services/cartService";

export interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItemAPI[];
  loading: boolean;
  error: string | null;
  totalPrice: number;
  totalQuantity: number;

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (data: AddToCartRequest) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  totalPrice: 0,
  totalQuantity: 0,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Lấy giỏ hàng từ backend
  fetchCart: async () => {
    try {
      set({ loading: true, error: null });
      const response = await cartService.getCart();
      set({
        items: response.data.items,
        totalPrice: response.data.tong_tien,
        totalQuantity: response.data.tong_so_luong,
        loading: false,
      });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Lỗi khi tải giỏ hàng",
        loading: false,
      });
    }
  },

  // Thêm sản phẩm vào giỏ
  addToCart: async (data) => {
    try {
      set({ loading: true, error: null });
      await cartService.addToCart(data);
      await get().fetchCart(); // refresh sau khi thêm
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Lỗi khi thêm vào giỏ hàng",
        loading: false,
      });
      throw error;
    }
  },

  // Xóa 1 sản phẩm
  removeFromCart: async (id) => {
    try {
      set({ loading: true, error: null });
      await cartService.removeItem(id);
      await get().fetchCart(); // refresh
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Lỗi khi xóa sản phẩm",
        loading: false,
      });
      throw error;
    }
  },

  // Cập nhật số lượng
  updateQuantity: async (id, quantity) => {
    try {
      set({ loading: true, error: null });
      await cartService.updateQuantity(id, { so_luong: quantity });
      await get().fetchCart(); // refresh
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Lỗi khi cập nhật số lượng",
        loading: false,
      });
      throw error;
    }
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async () => {
    try {
      set({ loading: true, error: null });
      await cartService.clearCart(); // gọi API clear giỏ hàng
      set({ items: [], totalPrice: 0, totalQuantity: 0, loading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Lỗi khi xóa giỏ hàng",
        loading: false,
      });
      throw error;
    }
  },
}));
