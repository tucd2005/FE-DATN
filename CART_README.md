# Hướng dẫn sử dụng Giỏ hàng với Zustand

## Tổng quan

Đã tích hợp giỏ hàng sử dụng Zustand để quản lý state toàn cục cho ứng dụng React.

## Cấu trúc

### 1. Store Zustand (`src/stores/cart.store.ts`)

```typescript
interface CartItem {
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
```

### 2. Các hàm chính

#### `addToCart(item: CartItem)`

- Thêm sản phẩm vào giỏ hàng
- Nếu sản phẩm cùng id, size, color đã tồn tại → tăng số lượng
- Nếu chưa có → thêm mới

#### `removeFromCart(id, size, color)`

- Xóa sản phẩm khỏi giỏ hàng dựa trên id, size, color

#### `updateQuantity(id, size, color, quantity)`

- Cập nhật số lượng sản phẩm
- Nếu quantity = 0 → tự động xóa sản phẩm

#### `clearCart()`

- Xóa toàn bộ giỏ hàng

## Sử dụng

### 1. Import store

```typescript
import { useCartStore } from "../stores/cart.store";
```

### 2. Sử dụng trong component

```typescript
const { items, addToCart, removeFromCart, updateQuantity } = useCartStore();

// Thêm vào giỏ hàng
const handleAddToCart = () => {
  const cartItem = {
    id: product.id,
    name: product.ten,
    size: selectedSize,
    color: selectedColor,
    price: Number(product.gia),
    quantity: quantity,
    image: productImage,
  };
  addToCart(cartItem);
};

// Cập nhật số lượng
const handleUpdateQuantity = (id, size, color, newQuantity) => {
  updateQuantity(id, size, color, newQuantity);
};

// Xóa sản phẩm
const handleRemoveItem = (id, size, color) => {
  removeFromCart(id, size, color);
};
```

### 3. Hiển thị số lượng giỏ hàng

```typescript
const { items } = useCartStore();
const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
```

## Tính năng đã tích hợp

### ✅ Trang chi tiết sản phẩm (`chitiet.tsx`)

- Nút "Thêm vào giỏ hàng" hoạt động
- Validation: yêu cầu chọn màu sắc
- Thông báo thành công khi thêm vào giỏ hàng

### ✅ Trang giỏ hàng (`giohang.tsx`)

- Hiển thị danh sách sản phẩm từ store
- Tăng/giảm số lượng sản phẩm
- Xóa sản phẩm khỏi giỏ hàng
- Tính tổng tiền tự động

### ✅ Layout header (`LayoutClient.tsx`)

- Hiển thị số lượng sản phẩm trong giỏ hàng
- Badge chỉ hiển thị khi có sản phẩm

## Lưu ý

- Store Zustand tự động persist state trong session
- Mỗi sản phẩm được định danh bởi: `id + size + color`
- Sản phẩm cùng id, size, color sẽ được gộp lại và tăng số lượng
