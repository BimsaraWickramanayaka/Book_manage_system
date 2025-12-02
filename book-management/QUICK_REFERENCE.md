# Quick Reference - JWT Authentication

## 🚀 Server Status

**Backend:** Running on `http://localhost:8000`

Start server:
```bash
php artisan serve
```

---

## 👤 Login Credentials

```
Email: test@example.com
Password: password
```

---

## 📝 Postman Quick Commands

### **Login (Get Token)**
```
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password"
}
```

Copy the `token` from response.

### **Protected Request (Example: List Books)**
```
GET http://localhost:8000/api/books
Authorization: Bearer <paste_token_here>
```

### **Logout**
```
POST http://localhost:8000/api/logout
Authorization: Bearer <token>
```

---

## 🔗 All API Endpoints

### **Auth (Public)**
- `POST /api/login` - Get token

### **Auth (Protected)**
- `GET /api/me` - Get current user
- `POST /api/logout` - Logout

### **Books (Protected)**
- `GET /api/books` - List books
- `POST /api/books` - Create book
- `GET /api/books/{id}` - Get book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### **Categories (Protected)**
- `GET /api/categories` - List categories

### **Borrow (Protected)**
- `POST /api/borrow` - Borrow book
- `POST /api/return` - Return book
- `GET /api/borrow-records` - List records

### **Users (Protected)**
- `GET /api/users` - List users

---

## 📄 Documentation Files

- **JWT_TESTING_GUIDE.md** - Detailed Postman testing guide
- **JWT_SETUP_SUMMARY.md** - Technical setup details

---

## 🧪 Test Checklist

- [ ] Login → Get token
- [ ] List categories with token
- [ ] Create book
- [ ] List books
- [ ] Borrow book
- [ ] List borrow records
- [ ] Return book
- [ ] Logout
- [ ] Try protected route without token (should fail)

---

## 🔐 Key Points

✅ Send `Authorization: Bearer token` header with all requests except login  
✅ Token expires after 1 hour  
✅ Login again to get new token  
✅ Logout invalidates token  
✅ Invalid token returns 401 Unauthorized  

---

**Frontend Next:** Create login page, store token, send with requests! 🚀
