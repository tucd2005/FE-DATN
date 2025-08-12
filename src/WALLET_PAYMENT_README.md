# Wallet Payment System - Frontend Implementation

## Tổng quan

Hệ thống thanh toán ví được tạo mới hoàn toàn, không động đến code cũ. Tất cả các file mới được đặt tên rõ ràng để tránh trùng lặp.

## Cấu trúc File Mới

### 1. Services (`src/services/`)

- **`walletPaymentService.ts`** - Service xử lý thanh toán đơn hàng bằng ví
  - `payWithWallet()` - Thanh toán đơn hàng
  - `checkPendingPayment()` - Kiểm tra đơn hàng chờ thanh toán

### 2. Hooks (`src/hooks/`)

- **`useWalletPayment.ts`** - Hooks cho wallet payment
  - `usePayWithWallet()` - Hook thanh toán ví
  - `useCheckPendingPayment()` - Hook kiểm tra đơn hàng chờ

### 3. Components (`src/components/`)

- **`WalletPaymentButton.tsx`** - Button thanh toán ví có thể tái sử dụng
- **`PendingPaymentAlert.tsx`** - Alert hiển thị đơn hàng chờ thanh toán
- **`WalletPaymentModal.tsx`** - Modal xác nhận thanh toán ví

## Các File Cũ KHÔNG BỊ THAY ĐỔI

### Services cũ (giữ nguyên):

- `walletService.ts` - Quản lý ví cho admin
- `walletClientService.ts` - Quản lý ví cho client (nạp/rút tiền)

### Hooks cũ (giữ nguyên):

- `useWallet.ts` - Hooks cho admin wallet
- `useWalletClient.ts` - Hooks cho client wallet

## Sự Khác Biệt và Tránh Trùng Lặp

| File Mới                  | File Cũ                  | Chức Năng                                 |
| ------------------------- | ------------------------ | ----------------------------------------- |
| `walletPaymentService.ts` | `walletService.ts`       | **MỚI**: Thanh toán đơn hàng bằng ví      |
| `walletPaymentService.ts` | `walletClientService.ts` | **MỚI**: Kiểm tra đơn hàng chờ thanh toán |
| `useWalletPayment.ts`     | `useWallet.ts`           | **MỚI**: Hooks cho wallet payment         |
| `useWalletPayment.ts`     | `useWalletClient.ts`     | **MỚI**: Hooks cho pending payment        |

## Cách Sử Dụng

### 1. Import Service

```typescript
import { walletPaymentService } from "../services/walletPaymentService";
```

### 2. Import Hooks

```typescript
import {
  usePayWithWallet,
  useCheckPendingPayment,
} from "../hooks/useWalletPayment";
```

### 3. Import Components

```typescript
import {
  WalletPaymentButton,
  PendingPaymentAlert,
  WalletPaymentModal,
} from "../components";
```

## Lưu Ý Quan Trọng

1. **KHÔNG sửa đổi** các file cũ: `walletService.ts`, `walletClientService.ts`, `useWallet.ts`, `useWalletClient.ts`
2. **Chỉ sử dụng** các file mới cho chức năng thanh toán đơn hàng bằng ví
3. **Các file cũ** vẫn giữ nguyên chức năng quản lý ví (nạp/rút tiền, xem số dư)
4. **Tên file mới** được đặt rõ ràng để tránh nhầm lẫn

## Ví Dụ Sử Dụng

### Thanh toán đơn hàng bằng ví:

```typescript
const { mutate: payWithWallet, isPending } = usePayWithWallet();

payWithWallet(orderId, {
  onSuccess: (data) => {
    console.log("Thanh toán thành công:", data);
  },
  onError: (error) => {
    console.error("Thanh toán thất bại:", error);
  },
});
```

### Kiểm tra đơn hàng chờ thanh toán:

```typescript
const { data: pendingPayment, isLoading } = useCheckPendingPayment();

if (pendingPayment?.status === "need_payment") {
  // Hiển thị alert thanh toán
}
```
