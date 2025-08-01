# Chat API Integration Guide

## Tổng quan

Hệ thống chat đã được tích hợp để cho phép nhắn tin trực tiếp giữa admin và client. Hệ thống bao gồm:

### Backend (Laravel)

- **MessageController**: Xử lý tin nhắn cho admin
- **ClientMessageController**: Xử lý tin nhắn cho client
- **Message Model**: Model để lưu trữ tin nhắn
- **Routes**: API endpoints cho cả admin và client

### Frontend (React)

- **Chat Bot Component**: Component chat bot cho client
- **Admin Chat Interface**: Giao diện chat cho admin
- **Hooks**: useClientChat, useChat để quản lý state
- **Services**: API services để gọi backend

## API Endpoints

### Client Endpoints

```
GET /api/client/tin-nhans - Lấy tin nhắn với admin
POST /api/client/tin-nhans - Gửi tin nhắn đến admin
```

### Admin Endpoints

```
GET /api/admin/tin-nhans - Lấy danh sách users có tin nhắn
GET /api/admin/tin-nhans/{userId} - Lấy tin nhắn với user cụ thể
POST /api/admin/tin-nhans - Gửi tin nhắn đến user
GET /api/admin/tin-nhans/all/messages - Lấy tất cả tin nhắn
```

## Cách sử dụng

### 1. Client Chat Bot

Component `chat_bot.tsx` đã được tích hợp sẵn với API:

- Tự động load tin nhắn từ server
- Gửi tin nhắn real-time
- Hỗ trợ đính kèm file
- Auto-refresh mỗi 3 giây
- Error handling

### 2. Admin Chat Interface

Component `chat_bot.tsx` trong admin đã được tích hợp:

- Hiển thị danh sách users có tin nhắn
- Chat với từng user
- Gửi tin nhắn và file
- Real-time updates

## Database Setup

### 1. Migration

Đảm bảo đã chạy migration cho bảng `messages`:

```bash
php artisan migrate
```

### 2. Seeder

User "chat@gmail.com" đã được tạo trong UserSeeder để làm chat support.

### 3. Storage

File đính kèm được lưu trong `storage/app/public/tin_nhan/`

## Authentication

### Client

- Sử dụng Sanctum authentication
- Middleware: `auth:sanctum`
- User role: 2 (customer)

### Admin

- Sử dụng Sanctum authentication
- Middleware: `auth:sanctum` + `adminorstaff`
- User roles: 1 (admin), 3 (staff)

## Features

### ✅ Đã hoàn thành

- [x] Real-time chat giữa admin và client
- [x] Gửi tin nhắn text
- [x] Đính kèm file (ảnh, PDF, doc)
- [x] Auto-refresh tin nhắn
- [x] Error handling
- [x] Loading states
- [x] File preview
- [x] Responsive UI
- [x] Authentication & Authorization

### 🔄 Tính năng bổ sung

- [ ] Push notifications
- [ ] Typing indicators
- [ ] Message status (sent, delivered, read)
- [ ] File upload progress
- [ ] Message search
- [ ] Message history pagination

## Troubleshooting

### Lỗi thường gặp

1. **Không thể kết nối API**

   - Kiểm tra backend server có đang chạy không
   - Kiểm tra CORS configuration
   - Kiểm tra authentication token

2. **Không gửi được tin nhắn**

   - Kiểm tra user đã đăng nhập chưa
   - Kiểm tra quyền truy cập
   - Kiểm tra validation rules

3. **File không upload được**
   - Kiểm tra file size (max 2MB cho client, 5MB cho admin)
   - Kiểm tra file type được cho phép
   - Kiểm tra storage permissions

### Debug

- Kiểm tra browser console cho frontend errors
- Kiểm tra Laravel logs cho backend errors
- Sử dụng Postman để test API endpoints

## Cấu hình

### Frontend

- API base URL: `http://localhost:8000/api`
- Auto-refresh interval: 3 seconds
- File upload max size: 2MB (client), 5MB (admin)

### Backend

- File storage: `storage/app/public/`
- Message pagination: 50 messages per page
- File validation: jpg, jpeg, png, gif, pdf, doc, docx
