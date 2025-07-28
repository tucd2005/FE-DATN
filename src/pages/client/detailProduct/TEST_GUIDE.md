# Hướng dẫn Test Tính năng Tự động Chuyển Biến thể

## Vấn đề đã được sửa

### 1. Logic tự động chuyển biến thể

- **Trước**: Logic có dependency `selectedAttributes` gây ra vòng lặp vô hạn
- **Sau**: Loại bỏ dependency `selectedAttributes` và chỉ theo dõi `selectedVariant?.so_luong`

### 2. Cải thiện UX

- Thêm state `isSearchingVariant` để hiển thị trạng thái đang tìm biến thể
- Thông báo rõ ràng hơn khi biến thể hết hàng
- Tự động ẩn thông báo sau 2 giây

## Cách Test

### 1. Sử dụng Component Test (Chỉ trong development)

```tsx
// Component VariantTest sẽ hiển thị trong development mode
// Cho phép test thủ công việc chuyển biến thể
```

### 2. Test tự động

1. **Tạo sản phẩm có nhiều biến thể**
2. **Đặt một biến thể hết hàng (so_luong = 0)**
3. **Chọn biến thể hết hàng**
4. **Hệ thống sẽ tự động chuyển sang biến thể khác còn hàng**

### 3. Test thủ công

1. Mở trang chi tiết sản phẩm
2. Click "Test Auto Variant Change" (chỉ hiển thị trong development)
3. Xem thông tin các biến thể
4. Click "Test Change to Available Variant"

## Logic hoạt động

### 1. Tự động chọn biến thể đầu tiên

```typescript
useEffect(() => {
  if (
    product?.variants?.length &&
    attributeNames.length &&
    Object.keys(selectedAttributes).length === 0
  ) {
    const firstAvailableVariant =
      product.variants.find((v) => v.so_luong > 0) || product.variants[0];
    // Tự động set thuộc tính
  }
}, [product, attributeNames]);
```

### 2. Tự động chuyển biến thể khi hết hàng

```typescript
useEffect(() => {
  if (
    selectedVariant &&
    selectedVariant.so_luong === 0 &&
    product?.variants?.length
  ) {
    setIsSearchingVariant(true);

    const availableVariant = product.variants.find((v) => v.so_luong > 0);

    if (availableVariant && availableVariant.id !== selectedVariant.id) {
      // Chuyển sang biến thể có hàng
    }

    setTimeout(() => setIsSearchingVariant(false), 2000);
  }
}, [selectedVariant?.so_luong, product]);
```

### 3. Cập nhật số lượng

```typescript
useEffect(() => {
  if (selectedVariant && quantity > selectedVariant.so_luong) {
    setQuantity(Math.min(quantity, selectedVariant.so_luong));
  }
}, [selectedVariant, quantity]);
```

## Các trường hợp test

### Trường hợp 1: Biến thể đầu tiên hết hàng

- **Input**: Biến thể đầu tiên có `so_luong = 0`
- **Expected**: Tự động chọn biến thể thứ 2 có hàng

### Trường hợp 2: Tất cả biến thể hết hàng

- **Input**: Tất cả biến thể có `so_luong = 0`
- **Expected**: Chọn biến thể đầu tiên và hiển thị thông báo hết hàng

### Trường hợp 3: Biến thể giữa hết hàng

- **Input**: Biến thể thứ 2 có `so_luong = 0`
- **Expected**: Tự động chuyển sang biến thể khác còn hàng

## Debug

### 1. Kiểm tra console

- Xem log khi biến thể thay đổi
- Kiểm tra state `selectedVariant`, `isSearchingVariant`

### 2. Sử dụng React DevTools

- Theo dõi state changes
- Kiểm tra component re-renders

### 3. Test component

- Sử dụng VariantTest component trong development
- Kiểm tra thông tin biến thể và stock

## Lưu ý

1. **Component test chỉ hiển thị trong development mode**
2. **Logic tự động chuyển biến thể chỉ hoạt động khi có biến thể khác còn hàng**
3. **Thông báo sẽ tự động ẩn sau 2 giây**
4. **Số lượng sẽ tự động điều chỉnh theo biến thể mới**
