# Product Detail Page Components

File `DetailPage.tsx` đã được tách thành các component nhỏ hơn để dễ quản lý và bảo trì.

## Cấu trúc Components

### 1. ProductImages.tsx

- **Chức năng**: Hiển thị hình ảnh chính và thumbnail của sản phẩm
- **Props**:
  - `productImages`: Danh sách ảnh sản phẩm
  - `variantThumbnails`: Ảnh thumbnail của các biến thể
  - `selectedImage`: Ảnh đang được chọn
  - `setSelectedImage`: Function để thay đổi ảnh được chọn
  - `handleSelectVariantImage`: Function xử lý khi chọn ảnh biến thể
  - `getVariantImage`: Function lấy URL ảnh biến thể
  - `selectedVariant`: Biến thể đang được chọn

### 2. ProductInfo.tsx

- **Chức năng**: Hiển thị thông tin sản phẩm, giá cả và thuộc tính
- **Props**:
  - `product`: Thông tin sản phẩm
  - `selectedAttributes`: Thuộc tính đã chọn
  - `setSelectedAttributes`: Function cập nhật thuộc tính
  - `attributeNames`: Tên các thuộc tính
  - `selectedVariant`: Biến thể đang chọn
  - `gia`: Giá sản phẩm
  - `giaKhuyenMai`: Giá khuyến mãi
  - `safeLocaleString`: Function format giá
  - `isAllAttributesSelected`: Kiểm tra đã chọn đủ thuộc tính

### 3. ProductActions.tsx

- **Chức năng**: Hiển thị số lượng và các nút hành động
- **Props**:
  - `quantity`: Số lượng
  - `setQuantity`: Function cập nhật số lượng
  - `maxQuantity`: Số lượng tối đa
  - `selectedVariant`: Biến thể đang chọn
  - `product`: Thông tin sản phẩm
  - `safeLocaleString`: Function format giá
  - `handleAddToCart`: Function thêm vào giỏ hàng
  - `handleBuyNow`: Function mua ngay

### 4. ServiceInfo.tsx

- **Chức năng**: Hiển thị thông tin dịch vụ (vận chuyển, bảo hành, đổi trả)
- **Props**: Không có props

### 5. ProductTabs.tsx

- **Chức năng**: Hiển thị các tab mô tả, thông số và đánh giá
- **Props**:
  - `productId`: ID sản phẩm
  - `selectedVariant`: Biến thể đang chọn
  - `quantity`: Số lượng
  - `productImages`: Ảnh sản phẩm
  - `selectedImage`: Ảnh đang chọn
  - `product`: Thông tin sản phẩm
  - `gia`: Giá sản phẩm
  - `giaKhuyenMai`: Giá khuyến mãi
  - `selectedAttributes`: Thuộc tính đã chọn

### 6. RelatedProducts.tsx

- **Chức năng**: Hiển thị sản phẩm liên quan
- **Props**: Không có props

### 7. VariantNotification.tsx

- **Chức năng**: Hiển thị thông báo khi biến thể tự động thay đổi
- **Props**:
  - `selectedVariant`: Biến thể hiện tại
  - `previousVariant`: Biến thể trước đó
  - `isAutoChange`: Trạng thái tự động thay đổi

## File chính DetailPage.tsx

File chính giữ nguyên toàn bộ logic nghiệp vụ:

- Quản lý state
- Xử lý API calls
- Logic thêm vào giỏ hàng
- Logic mua ngay
- Xử lý thuộc tính sản phẩm
- Format dữ liệu
- **Tự động chọn biến thể**: Tự động chọn biến thể đầu tiên có hàng khi load trang
- **Tự động chuyển biến thể**: Tự động chuyển sang biến thể khác khi biến thể hiện tại hết hàng
- **Cập nhật số lượng**: Tự động điều chỉnh số lượng khi biến thể thay đổi

## Lợi ích của việc tách component

1. **Dễ bảo trì**: Mỗi component có trách nhiệm riêng biệt
2. **Tái sử dụng**: Có thể sử dụng lại các component ở nơi khác
3. **Dễ test**: Có thể test từng component riêng lẻ
4. **Code sạch hơn**: File chính ngắn gọn, dễ đọc
5. **Phân chia trách nhiệm**: Logic nghiệp vụ và UI được tách biệt

## Cách sử dụng

```tsx
import {
  ProductImages,
  ProductInfo,
  ProductActions,
  ServiceInfo,
  ProductTabs,
  RelatedProducts,
  VariantNotification,
} from "./components";
```

Tất cả các component đều được export từ file `components/index.ts` để dễ import.

## Tính năng tự động chọn biến thể

### 1. Tự động chọn biến thể đầu tiên

- Khi trang chi tiết sản phẩm được load, hệ thống sẽ tự động chọn biến thể đầu tiên có hàng
- Nếu tất cả biến thể đều hết hàng, sẽ chọn biến thể đầu tiên

### 2. Tự động chuyển biến thể khi hết hàng

- Khi biến thể hiện tại hết hàng, hệ thống sẽ tự động tìm biến thể khác còn hàng
- Nếu không có biến thể nào còn hàng, sẽ chọn biến thể đầu tiên
- Hiển thị thông báo khi tự động chuyển biến thể

### 3. Cập nhật số lượng

- Tự động điều chỉnh số lượng khi biến thể thay đổi
- Đảm bảo số lượng không vượt quá tồn kho của biến thể mới

### 4. Thông báo trạng thái

- Hiển thị thông báo khi biến thể hết hàng
- Hiển thị thông báo khi tự động chuyển biến thể
- Thông báo tự động ẩn sau 3 giây
