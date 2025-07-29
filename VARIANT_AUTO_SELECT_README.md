# Chức năng Tự động Chọn Biến thể

## Tổng quan

Đã triển khai chức năng tự động chọn biến thể còn stock khi biến thể hiện tại hết hàng.

## Tính năng

✅ **Tự động chọn biến thể đầu tiên**: Khi vào trang chi tiết sản phẩm, tự động chọn biến thể còn hàng đầu tiên

✅ **Tự động chuyển biến thể**: Khi biến thể hiện tại hết hàng, tự động chuyển sang biến thể khác còn stock

✅ **Thông báo tự động**: Hiển thị thông báo khi tự động chuyển biến thể

✅ **Test component**: Component để test chức năng tự động chuyển biến thể

## Cách hoạt động

### 1. Tự động chọn biến thể đầu tiên

```typescript
useEffect(() => {
  if (
    product?.variants?.length &&
    attributeNames.length &&
    Object.keys(selectedAttributes).length === 0
  ) {
    // Tìm biến thể còn hàng đầu tiên
    const firstAvailableVariant =
      product.variants.find((v) => v.so_luong > 0) || product.variants[0];
    const defaultAttributes: { [key: string]: string } = {};
    firstAvailableVariant.thuoc_tinh.forEach((attr) => {
      defaultAttributes[attr.ten] = attr.gia_tri;
    });
    setSelectedAttributes(defaultAttributes);
  }
}, [product, attributeNames]);
```

### 2. Tự động chuyển biến thể khi hết hàng

```typescript
useEffect(() => {
  if (selectedVariant && selectedVariant.so_luong === 0) {
    setPreviousVariant(selectedVariant);
    setIsAutoChange(true);

    // Tìm biến thể khác còn hàng
    const availableVariant = product?.variants?.find(
      (v) => v.so_luong > 0 && v.id !== selectedVariant.id
    );

    if (availableVariant) {
      // Tạo attributes mới cho biến thể có sẵn
      const newAttributes: { [key: string]: string } = {};
      availableVariant.thuoc_tinh.forEach((attr) => {
        newAttributes[attr.ten] = attr.gia_tri;
      });
      setSelectedAttributes(newAttributes);
    }
  } else {
    setIsAutoChange(false);
  }
}, [selectedVariant, product?.variants]);
```

## Components

### 1. VariantNotification

Hiển thị thông báo khi tự động chuyển biến thể:

- Thông báo khi chuyển sang biến thể còn hàng
- Thông báo khi biến thể hiện tại hết hàng
- Tự động ẩn sau 3 giây

### 2. VariantTest

Component để test chức năng tự động chuyển biến thể:

- Hiển thị thông tin biến thể hiện tại
- Hiển thị danh sách tất cả biến thể
- Nút test để chuyển sang biến thể khác

## State Management

```typescript
// State để theo dõi biến thể trước đó và trạng thái tự động chuyển
const [previousVariant, setPreviousVariant] = useState<Variant | null>(null);
const [isAutoChange, setIsAutoChange] = useState(false);
```

## Test

1. Vào trang chi tiết sản phẩm có nhiều biến thể
2. Chọn biến thể có stock = 0
3. Hệ thống sẽ tự động chuyển sang biến thể khác còn hàng
4. Thông báo sẽ hiển thị ở góc trên bên phải
5. Sử dụng component VariantTest để test thủ công

## Lưu ý

- Logic tự động chuyển chỉ hoạt động khi có biến thể khác còn hàng
- Thông báo chỉ hiển thị khi thực sự có sự thay đổi biến thể
- Component VariantTest có thể xóa sau khi test xong
