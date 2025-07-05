# Hướng dẫn sử dụng Giỏ hàng với Zustand + API

## Tổng quan

Đã tích hợp giỏ hàng sử dụng Zustand để quản lý state toàn cục và kết nối với API backend Laravel.

## Cấu trúc

### 1. Store Zustand (`src/stores/cart.store.ts`)

```typescript
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
}
```

### 2. API Service (`src/services/cartService.ts`)

```typescript
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
```

### 3. Các hàm chính

#### `fetchCart()`

- Lấy danh sách giỏ hàng từ API
- Cập nhật state với dữ liệu từ server

#### `addToCart(data: AddToCartRequest)`

- Thêm sản phẩm vào giỏ hàng qua API
- Tự động refresh giỏ hàng sau khi thêm

#### `removeFromCart(id: number)`

- Xóa sản phẩm khỏi giỏ hàng qua API
- Tự động refresh giỏ hàng sau khi xóa

#### `updateQuantity(id: number, quantity: number)`

- Cập nhật số lượng sản phẩm qua API
- Tự động refresh giỏ hàng sau khi cập nhật

#### `clearCart()`

- Xóa toàn bộ giỏ hàng qua API

## Sử dụng

### 1. Import store

```typescript
import { useCartStore } from "../stores/cart.store";
```

### 2. Sử dụng trong component

```typescript
const {
  items,
  loading,
  error,
  totalPrice,
  totalQuantity,
  fetchCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} = useCartStore();

// Load giỏ hàng khi component mount
useEffect(() => {
  fetchCart();
}, [fetchCart]);

// Thêm vào giỏ hàng
const handleAddToCart = async () => {
  try {
    const cartData = {
      san_pham_id: product.id,
      so_luong: quantity,
      bien_the_id: selectedVariant?.id || undefined,
    };
    await addToCart(cartData);
  } catch (error) {
    // Xử lý lỗi
  }
};

// Cập nhật số lượng
const handleUpdateQuantity = async (id, newQuantity) => {
  await updateQuantity(id, newQuantity);
};

// Xóa sản phẩm
const handleRemoveItem = async (id) => {
  await removeFromCart(id);
};
```

### 3. Hiển thị số lượng giỏ hàng

```typescript
const { totalQuantity } = useCartStore();
// totalQuantity đã được tính từ API
```

## API Endpoints

### Backend Laravel Routes

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);           // Lấy giỏ hàng
        Route::post('/add', [CartController::class, 'addToCart']);   // Thêm sản phẩm
        Route::put('/update/{id}', [CartController::class, 'updateQuantity']); // Cập nhật số lượng
        Route::delete('/remove/{id}', [CartController::class, 'removeItem']);  // Xóa sản phẩm
        Route::delete('/clear', [CartController::class, 'clearCart']);         // Xóa toàn bộ
    });
});
```

## Tính năng đã tích hợp

### ✅ Trang chi tiết sản phẩm (`chitiet.tsx`)

- Nút "Thêm vào giỏ hàng" gọi API
- Validation: yêu cầu chọn màu sắc
- Thông báo thành công/lỗi khi thêm vào giỏ hàng
- Hỗ trợ thêm variant (bien_the_id)

### ✅ Trang giỏ hàng (`giohang.tsx`)

- Load dữ liệu từ API khi component mount
- Hiển thị loading state và error handling
- Tăng/giảm số lượng sản phẩm qua API
- Xóa sản phẩm khỏi giỏ hàng qua API
- Hiển thị thuộc tính sản phẩm (size, color) từ variant
- Tính tổng tiền từ API

### ✅ Layout header (`LayoutClient.tsx`)

- Hiển thị số lượng sản phẩm từ API
- Badge chỉ hiển thị khi có sản phẩm

## Lưu ý

- Cần đăng nhập để sử dụng giỏ hàng (middleware auth:sanctum)
- Store tự động refresh sau mỗi thao tác CRUD
- Hỗ trợ đầy đủ error handling và loading states
- Dữ liệu được đồng bộ với database thông qua API
