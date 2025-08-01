# Hệ thống Ví điện tử - Shop Quần áo Thể thao

## Tổng quan

Hệ thống ví điện tử được phát triển để cho phép khách hàng nạp tiền, rút tiền và thanh toán đơn hàng thông qua ví điện tử tích hợp.

## Cấu trúc Backend

### Controllers

- `WalletController.php` - Xử lý các API cho client
- `WalletTransactionController.php` - Xử lý các API cho admin

### Models

- `Wallet.php` - Model ví điện tử
- `WalletTransaction.php` - Model giao dịch ví

### Services

- `WalletService.php` - Service xử lý logic nghiệp vụ ví

## Cấu trúc Frontend

### Services

- `clientWalletService.ts` - Service cho client wallet
- `walletService.ts` - Service cho admin wallet

### Hooks

- `useClientWallet.ts` - Hooks cho client wallet
- `useWallet.ts` - Hooks cho admin wallet

### Pages

- `WalletPage.tsx` - Trang ví chính cho client
- `WalletHistoryPage.tsx` - Trang lịch sử giao dịch
- `WalletPaymentPage.tsx` - Trang thanh toán bằng ví
- `WalletListPage.tsx` - Trang quản lý ví cho admin

### Components

- `WalletWidget.tsx` - Component widget hiển thị số dư

## API Endpoints

### Client APIs

```
GET /client/wallet/balance - Lấy số dư ví
GET /client/wallet/transactions - Lấy lịch sử giao dịch (có filter)
POST /client/wallet/withdraw - Rút tiền từ ví
POST /client/wallet/refund - Hoàn tiền vào ví
```

### Admin APIs

```
GET /admin/wallet-transactions - Lấy danh sách giao dịch
GET /admin/wallet-transactions/{id} - Lấy chi tiết giao dịch
PATCH /admin/wallet-transactions/{id} - Cập nhật trạng thái giao dịch
```

## Tính năng chính

### Cho Client

1. **Xem số dư ví** - Hiển thị số dư hiện tại
2. **Rút tiền** - Rút tiền về tài khoản ngân hàng (tối thiểu 50,000₫)
3. **Thanh toán** - Thanh toán đơn hàng bằng số dư ví
4. **Hoàn tiền** - Nhận hoàn tiền khi đơn hàng bị hủy
5. **Lịch sử giao dịch** - Xem lịch sử các giao dịch
6. **Thống kê** - Thống kê tổng hoàn tiền, rút, thanh toán

### Cho Admin

1. **Quản lý giao dịch** - Xem danh sách tất cả giao dịch
2. **Duyệt rút tiền** - Duyệt hoặc từ chối yêu cầu rút tiền
3. **Tìm kiếm** - Tìm kiếm theo tên, email, số điện thoại
4. **Lọc theo trạng thái** - Lọc theo loại giao dịch và trạng thái

## Quy trình hoạt động

### Rút tiền

1. Client nhập thông tin tài khoản ngân hàng
2. Hệ thống tạo giao dịch với trạng thái "pending"
3. Admin xem và duyệt yêu cầu
4. Nếu duyệt: cập nhật trạng thái "success" và trừ tiền khỏi ví
5. Nếu từ chối: cập nhật trạng thái "rejected" và ghi lý do

### Thanh toán đơn hàng

1. Client chọn thanh toán bằng ví
2. Kiểm tra số dư có đủ không
3. Nếu đủ: trừ tiền khỏi ví và cập nhật trạng thái đơn hàng
4. Nếu không đủ: thông báo cần nạp thêm tiền

### Hoàn tiền

1. Admin hủy đơn hàng đã thanh toán
2. Hệ thống tự động hoàn tiền vào ví của client
3. Tạo giao dịch refund với trạng thái "success"
4. Client có thể xem trong lịch sử giao dịch

## Routes

### Client Routes

```
/vi-dien-tu - Trang ví chính
/vi-dien-tu/lich-su - Lịch sử giao dịch
/vi-dien-tu/thanh-toan - Thanh toán bằng ví
```

### Admin Routes

```
/admin/vi-tien - Quản lý giao dịch ví
```

## Cài đặt và sử dụng

### Backend

1. Đảm bảo đã cài đặt Laravel và các dependencies
2. Chạy migration để tạo bảng wallet và wallet_transactions
3. Cấu hình VNPAY trong file config/services.php

### Frontend

1. Cài đặt dependencies: `npm install`
2. Cấu hình API base URL trong utils/axios.ts
3. Chạy development server: `npm run dev`

## Bảo mật

- Tất cả API đều yêu cầu authentication
- Admin APIs có middleware kiểm tra quyền admin
- Giao dịch được ghi log đầy đủ
- Validation dữ liệu đầu vào nghiêm ngặt

## Tương lai

- Tích hợp thêm các cổng thanh toán khác
- Thêm tính năng chuyển tiền giữa các tài khoản
- Tích hợp với hệ thống khuyến mãi
- Thêm báo cáo và thống kê chi tiết
- Mobile app cho ví điện tử
