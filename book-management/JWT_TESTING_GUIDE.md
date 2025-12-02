# JWT Authentication - Postman Testing Guide

## ✅ Backend Setup Complete!

Your Laravel backend now has JWT-based authentication working. Follow these steps to test it in Postman.

---

## 📝 Test User Credentials

```
Email: test@example.com
Password: password
```

This user was seeded in the database and can login.

---

## 🧪 Testing Steps in Postman

### **Step 1: Login & Get JWT Token**

**Request:**
```
POST http://localhost:8000/api/login
Content-Type: application/json

Body (JSON):
{
  "email": "test@example.com",
  "password": "password"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAiLCJpYXQiOjE3MzM3NjA2NzIsImV4cCI6MTczMzc2NDI3MiwibmJmIjoxNzMzNzYwNjcyLCJqdGkiOiI2TTJQeVFRQUxYR29ueW5OIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1YzRhNDlhMDZmYzAxZWZiMDFkMTJiM2YzZDkwZjI4OWQxYzIifQ.rqY4KvGBkxZ9...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "email_verified_at": null,
    "created_at": "2025-12-02T...",
    "updated_at": "2025-12-02T..."
  }
}
```

**💾 IMPORTANT: Copy the token from response!** You need it for all protected routes.

---

### **Step 2: Get Current User Info**

**Request:**
```
GET http://localhost:8000/api/me
Authorization: Bearer YOUR_TOKEN_HERE
```

**How to set Authorization header in Postman:**
1. Click "Authorization" tab
2. Select "Bearer Token" from dropdown
3. Paste your token in the "Token" field
4. Click Send

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "email_verified_at": null,
  "created_at": "2025-12-02T...",
  "updated_at": "2025-12-02T..."
}
```

---

### **Step 3: List Categories (Protected Route)**

**Request:**
```
GET http://localhost:8000/api/categories
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Fiction",
    "created_at": "2025-12-02T...",
    "updated_at": "2025-12-02T..."
  },
  {
    "id": 2,
    "name": "Non-Fiction",
    "created_at": "2025-12-02T...",
    "updated_at": "2025-12-02T..."
  },
  ...
]
```

---

### **Step 4: Create a Book (Protected Route)**

**Request:**
```
POST http://localhost:8000/api/books
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "title": "1984",
  "author": "George Orwell",
  "price": 12.99,
  "stock": 10,
  "book_category_id": 1
}
```

**Expected Response (201 Created):**
```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "price": "12.99",
  "stock": 10,
  "book_category_id": 1,
  "category": {
    "id": 1,
    "name": "Fiction",
    "created_at": "...",
    "updated_at": "..."
  },
  "created_at": "...",
  "updated_at": "..."
}
```

---

### **Step 5: List Books (Protected Route)**

**Request:**
```
GET http://localhost:8000/api/books
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "price": "12.99",
    "stock": 10,
    "book_category_id": 1,
    "category": "Fiction",
    "out_of_stock": false
  }
]
```

---

### **Step 6: Logout (Invalidate Token)**

**Request:**
```
POST http://localhost:8000/api/logout
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

### **Step 7: Try Protected Route After Logout (Should Fail)**

**Request:**
```
GET http://localhost:8000/api/me
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (401 Unauthorized):**
```json
{
  "message": "Unauthenticated."
}
```

Or if you don't send the token:

**Request:**
```
GET http://localhost:8000/api/books
(WITHOUT Authorization header)
```

**Expected Response (401 Unauthorized):**
```json
{
  "message": "Unauthenticated."
}
```

---

## 🔄 Complete Testing Workflow

Follow this order in Postman:

1. ✅ **Login** → Get token
2. ✅ **Me** → Verify token works
3. ✅ **Categories** → List all categories
4. ✅ **Create Book** → Add a book
5. ✅ **List Books** → See created book
6. ✅ **Edit Book** → Update book details
7. ✅ **Delete Book** → Remove book
8. ✅ **Create Borrow** → Borrow a book
9. ✅ **List Borrow Records** → See borrow records
10. ✅ **Return Book** → Return borrowed book
11. ✅ **List Users** → See all users
12. ✅ **Logout** → Invalidate token
13. ✅ **Try Protected Route** → Should fail with 401

---

## 🎯 Key Points

✅ **Only `/api/login` is public** - No token needed  
✅ **All other routes are protected** - Require valid JWT token  
✅ **Token in Authorization header** - `Authorization: Bearer YOUR_TOKEN`  
✅ **Token expires after 1 hour** - Login again to get new token  
✅ **Logout invalidates token** - Cannot use token after logout  

---

## 🔐 Testing Without Token (Should Fail)

**Request (without Authorization header):**
```
GET http://localhost:8000/api/books
```

**Response (401 Unauthorized):**
```json
{
  "message": "Unauthenticated."
}
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid credentials" | Check email: `test@example.com`, password: `password` |
| "Unauthenticated" | Add `Authorization: Bearer token` header |
| "Token has expired" | Login again to get new token |
| Server not running | Run `php artisan serve` |
| 500 error | Check Laravel logs in `storage/logs/` |

---

## 📚 All Protected Endpoints

Once logged in with token, you can access:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/me` | Get current user |
| POST | `/api/logout` | Logout |
| GET | `/api/categories` | List categories |
| GET | `/api/books` | List books |
| POST | `/api/books` | Create book |
| GET | `/api/books/{id}` | Get single book |
| PUT | `/api/books/{id}` | Update book |
| DELETE | `/api/books/{id}` | Delete book |
| POST | `/api/borrow` | Borrow book |
| POST | `/api/return` | Return book |
| GET | `/api/borrow-records` | List borrow records |
| GET | `/api/users` | List all users |

---

## ✨ Summary

Your backend now has:
- ✅ JWT authentication working
- ✅ Login endpoint returning token
- ✅ All routes protected by auth middleware
- ✅ Logout functionality
- ✅ User seeded and ready to login

**Next Step:** Integrate this into React frontend with login page and localStorage for token storage.

---

**Happy Testing! 🚀**
