# Wallet Components Documentation

## Tổng quan

Phần ví điện tử bao gồm các component để quản lý ví, nạp tiền, rút tiền và xem lịch sử giao dịch.

## Các Component

### 1. WalletTab.tsx

Component chính chứa tất cả các chức năng ví điện tử.

**Tính năng:**

- Hiển thị header với số dư
- Các nút nạp tiền và rút tiền
- Thông tin ví
- Thống kê giao dịch
- Lịch sử giao dịch
- Cảnh báo giao dịch đang chờ

### 2. WalletHeader.tsx

Header hiển thị số dư ví và nút làm mới.

**Props:** Không có
**Hooks sử dụng:** `useWalletBalance`

### 3. WalletActions.tsx

Component chứa các nút nạp tiền và rút tiền.

**Props:**

- `onDepositClick`: Callback khi click nút nạp tiền
- `onWithdrawClick`: Callback khi click nút rút tiền

**Hooks sử dụng:** `useWalletBalance`, `useWalletWithdraw`

### 4. WalletInfo.tsx

Hiển thị thông tin ví bao gồm số dư và các quy định.

**Props:** Không có
**Hooks sử dụng:** `useWalletBalance`

### 5. WalletStats.tsx

Hiển thị thống kê giao dịch.

**Props:** Không có
**Hooks sử dụng:** `useWalletTransactions`

### 6. TransactionHistory.tsx

Bảng hiển thị lịch sử giao dịch với filter và pagination.

**Props:**

- `className`: CSS class tùy chọn

**Hooks sử dụng:** `useWalletTransactions`

### 7. DepositModal.tsx

Modal nạp tiền với form nhập số tiền.

**Props:**

- `visible`: Hiển thị modal
- `onCancel`: Callback khi hủy
- `onSuccess`: Callback khi thành công

**Hooks sử dụng:** `useWalletDeposit`

### 8. WithdrawModal.tsx

Modal rút tiền với form nhập thông tin ngân hàng.

**Props:**

- `visible`: Hiển thị modal
- `onCancel`: Callback khi hủy
- `onSuccess`: Callback khi thành công

**Hooks sử dụng:** `useWalletWithdraw`, `useWalletBalance`

### 9. PendingTransactionAlert.tsx

Cảnh báo khi có giao dịch đang chờ xử lý.

**Props:** Không có
**Hooks sử dụng:** `useCheckPendingTransaction`

### 10. VnpayCallbackHandler.tsx

Xử lý callback từ VNPay sau khi thanh toán.

**Props:** Không có
**Routes:** `/vnpay-callback`

## API Endpoints

### Client APIs (Frontend)

- `GET /wallet` - Lấy số dư ví
- `GET /wallet/transactions` - Lấy lịch sử giao dịch
- `POST /wallet/deposit` - Nạp tiền
- `POST /wallet/withdraw` - Rút tiền
- `GET /wallet/check-pending` - Kiểm tra giao dịch đang chờ

### Admin APIs (Backend)

- `GET /admin/wallet-transactions` - Danh sách giao dịch (admin)
- `GET /admin/wallet-transactions/{id}` - Chi tiết giao dịch
- `PATCH /admin/wallet-transactions/{id}` - Cập nhật trạng thái

## Hooks

### useWalletClient.ts

Các hook cho client:

- `useWalletBalance()` - Lấy số dư ví
- `useWalletTransactions()` - Lấy lịch sử giao dịch
- `useWalletDeposit()` - Nạp tiền
- `useWalletWithdraw()` - Rút tiền
- `useCheckPendingTransaction()` - Kiểm tra giao dịch đang chờ

### useWallet.ts

Các hook cho admin:

- `useWalletTransactionList()` - Danh sách giao dịch
- `useWalletTransactionDetail()` - Chi tiết giao dịch
- `useUpdateWalletStatus()` - Cập nhật trạng thái

## Quy trình hoạt động

### Nạp tiền:

1. User nhập số tiền trong DepositModal
2. Gọi API `/wallet/deposit`
3. Backend tạo giao dịch và trả về URL thanh toán VNPay
4. Frontend mở URL thanh toán trong tab mới
5. User thanh toán trên VNPay
6. VNPay callback về `/vnpay-callback`
7. VnpayCallbackHandler xử lý kết quả
8. Backend cập nhật trạng thái giao dịch

### Rút tiền:

1. User nhập thông tin trong WithdrawModal
2. Gọi API `/wallet/withdraw`
3. Backend tạo giao dịch với trạng thái "pending"
4. Admin xem danh sách giao dịch trong WalletListPage
5. Admin duyệt hoặc từ chối giao dịch
6. Backend cập nhật trạng thái và gửi email thông báo

## Cấu hình

### VNPay Configuration

Cần cấu hình trong backend:

- `vnp_Url`: URL thanh toán VNPay
- `vnp_ReturnUrl`: URL callback
- `vnp_TmnCode`: Mã merchant
- `vnp_HashSecret`: Secret key

### Email Configuration

Backend gửi email thông báo khi:

- Nạp tiền thành công
- Rút tiền được duyệt/từ chối
- Giao dịch hết hạn

## Lưu ý

1. **Bảo mật:** Tất cả API đều yêu cầu authentication
2. **Validation:** Frontend và backend đều có validation
3. **Error Handling:** Có xử lý lỗi và hiển thị thông báo
4. **Loading States:** Có loading state cho tất cả operations
5. **Real-time:** Có kiểm tra giao dịch đang chờ mỗi 10 giây
