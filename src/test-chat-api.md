# Test Chat API

## Test Cases

### 1. Client Authentication

```bash
# Login client
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@example.com",
    "password": "password"
  }'
```

### 2. Get Client Messages

```bash
# Get messages with admin
curl -X GET http://localhost:8000/api/client/tin-nhans \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```

### 3. Send Client Message

```bash
# Send text message
curl -X POST http://localhost:8000/api/client/tin-nhans \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "noi_dung": "Xin chào! Tôi cần hỗ trợ về sản phẩm"
  }'
```

### 4. Send Client Message with File

```bash
# Send message with file attachment
curl -X POST http://localhost:8000/api/client/tin-nhans \
  -H "Authorization: Bearer {token}" \
  -F "noi_dung=Đây là ảnh sản phẩm" \
  -F "tep_dinh_kem=@/path/to/image.jpg"
```

### 5. Admin Authentication

```bash
# Login admin
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'
```

### 6. Get Admin User List

```bash
# Get users with messages
curl -X GET http://localhost:8000/api/admin/tin-nhans \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```

### 7. Get Admin Messages with User

```bash
# Get messages with specific user
curl -X GET http://localhost:8000/api/admin/tin-nhans/{userId} \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```

### 8. Send Admin Message

```bash
# Send message to user
curl -X POST http://localhost:8000/api/admin/tin-nhans \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "nguoi_nhan_id": 1,
    "noi_dung": "Chào bạn! Tôi có thể giúp gì?"
  }'
```

### 9. Get All Messages (Admin)

```bash
# Get all messages
curl -X GET http://localhost:8000/api/admin/tin-nhans/all/messages \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```

## Expected Responses

### Success Response

```json
{
  "data": [
    {
      "id": 1,
      "noi_dung": "Xin chào!",
      "tep_dinh_kem": null,
      "nguoi_gui_id": 1,
      "nguoi_gui_name": "Client Name",
      "nguoi_nhan_id": 2,
      "nguoi_nhan_name": "Chat Support",
      "created_at": "2024-01-01T00:00:00.000000Z"
    }
  ]
}
```

### Error Response

```json
{
  "message": "Unauthenticated",
  "status": 401
}
```

## Frontend Test

### 1. Open Browser Console

1. Mở trang home
2. Mở Developer Tools (F12)
3. Kiểm tra Console tab

### 2. Check Network Requests

1. Mở Network tab
2. Gửi tin nhắn qua chat bot
3. Kiểm tra API calls

### 3. Test Authentication

1. Đăng nhập client
2. Kiểm tra token được lưu
3. Test chat bot functionality

### 4. Test File Upload

1. Chọn file để đính kèm
2. Gửi tin nhắn
3. Kiểm tra file được upload

## Common Issues

### 1. CORS Error

```
Access to fetch at 'http://localhost:8000/api/client/tin-nhans' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**: Kiểm tra CORS configuration trong Laravel

### 2. Authentication Error

```
401 Unauthorized
```

**Solution**: Kiểm tra token authentication

### 3. File Upload Error

```
413 Payload Too Large
```

**Solution**: Kiểm tra file size limit

### 4. Database Error

```
SQLSTATE[42S02]: Base table or view not found
```

**Solution**: Chạy migration cho bảng messages
