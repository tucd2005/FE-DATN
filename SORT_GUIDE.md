# Hướng dẫn Sắp xếp Sản phẩm

## Tính năng đã triển khai

✅ **Sắp xếp theo giá**:

- Giá thấp đến cao (ưu tiên giá khuyến mãi)
- Giá cao đến thấp (ưu tiên giá khuyến mãi)

✅ **Sắp xếp theo tên**:

- Tên A-Z
- Tên Z-A

✅ **Sắp xếp theo thời gian**:

- Mới nhất
- Phổ biến nhất

## Cách hoạt động

### 1. API Sort (Backend)

- Gửi request với `sort_by` và `sort_order` đến `/api/products/filter`
- Backend xử lý sort theo `variants_min_gia_khuyen_mai` cho giá

### 2. Client-side Sort (Frontend)

- Sử dụng utility function `sortProducts()` để sort chính xác hơn
- Xử lý logic giá khuyến mãi vs giá gốc
- Sort theo variants nếu có

## Files chính

- `src/utils/sortProducts.ts` - Logic sort client-side
- `src/hooks/useProductsClient.ts` - TanStack Query hook
- `src/services/productservice.ts` - API service
- `src/pages/client/san_pham/components/SortDropdown.tsx` - Component dropdown

## Test

Truy cập: `http://localhost:5173/san-pham`

Debug info sẽ hiển thị thông tin sort hiện tại để kiểm tra.

## Lưu ý

- Sort theo giá sẽ ưu tiên giá khuyến mãi nếu có
- Nếu sản phẩm có variants, sẽ lấy giá thấp nhất từ variants
- Client-side sort đảm bảo chính xác hơn API sort
