import { create } from "zustand";

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
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  updateQuantity: (
    id: number,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      // Kiểm tra nếu sản phẩm cùng id, size, color đã có thì tăng số lượng
      const existingIndex = state.items.findIndex(
        (i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (existingIndex !== -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += item.quantity;
        return { items: newItems };
      }
      return { items: [...state.items, item] };
    }),
  removeFromCart: (id, size, color) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.id === id && i.size === size && i.color === color)
      ),
    })),
  updateQuantity: (id, size, color, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.size === size && i.color === color
          ? { ...i, quantity }
          : i
      ),
    })),
  clearCart: () => set({ items: [] }),
}));
