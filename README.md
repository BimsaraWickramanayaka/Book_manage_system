# Book Management System

A full-stack web application for managing books, categories, and borrowing records. Built with **Laravel** backend and **React + Vite** frontend, connected to a **PostgreSQL** database.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Project Summary](#project-summary)

---

## ✨ Features

### Authentication & Security
- ✅ JWT (JSON Web Token) based authentication
- ✅ Secure login system with email/password
- ✅ Automatic token storage in localStorage
- ✅ Axios interceptors for automatic token injection
- ✅ Auto-logout on token expiration (401 errors)
- ✅ Demo credentials pre-filled for easy testing

### Book Management
- ✅ Create, read, update, and delete books (authenticated users only)
- ✅ Organize books by categories
- ✅ Track book stock levels
- ✅ Filter books by category

### Borrow & Return System
- ✅ Record book borrowing with user tracking
- ✅ Automatic stock reduction on borrow
- ✅ Record return dates
- ✅ Automatic stock increase on return
- ✅ View all borrow records

### Category Management
- ✅ Pre-seeded categories (Fiction, Non-Fiction, Science, Technology, History)
- ✅ Link books to categories

---

## 🛠 Tech Stack

### Backend
- **Framework:** Laravel 11
- **Database:** PostgreSQL
- **Language:** PHP
- **API:** RESTful JSON API

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Styling:** CSS

### Development Tools
- **Composer** (PHP package manager)
- **npm** (Node package manager)
- **Artisan CLI** (Laravel command tool)

---

## 📁 Project Structure

```
Assignment/
├── book-management/          # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   │   ├── BookController.php
│   │   │   │   ├── BookCategoryController.php
│   │   │   │   └── BorrowController.php
│   │   │   └── Requests/
│   │   │       ├── StoreBookRequest.php
│   │   │       └── UpdateBookRequest.php
│   │   ├── Models/
│   │   │   ├── Book.php
│   │   │   ├── BookCategory.php
│   │   │   ├── BorrowRecord.php
│   │   │   └── User.php
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 2025_12_01_112200_create_book_categories_table.php
│   │   │   ├── 2025_12_01_112306_create_books_table.php
│   │   │   └── 2025_12_01_112418_create_borrow_records_table.php
│   │   └── seeders/
│   │       ├── BookCategorySeeder.php
│   │       ├── UserSeeder.php
│   │       └── DatabaseSeeder.php
│   ├── routes/
│   │   ├── api.php              # API Routes
│   │   └── web.php
│   ├── .env                     # Environment configuration
│   ├── composer.json
│   ├── artisan
│   └── ...
│
└── book-manage-frontend/       # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── BookList.jsx
    │   │   ├── BookForm.jsx
    │   │   ├── BorrowReturn.jsx
    │   │   └── CategoryFilter.jsx
    │   ├── api/
    │   │   └── api.js           # Axios instance
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── ...
    ├── package.json
    ├── vite.config.js
    └── ...
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.2+** - [Download](https://www.php.net/downloads)
- **PostgreSQL 12+** - [Download](https://www.postgresql.org/download/)
- **Composer** - [Install](https://getcomposer.org/download/)
- **Node.js 16+** (npm included) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)

### Verify Installations

```bash
php --version
postgres --version
composer --version
node --version
npm --version
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BimsaraWickramanayaka/Book_manage_system.git
cd Assignment
```

### 2. Backend Setup

#### Step 2.1: Install Dependencies

```bash
cd book-management
composer install
```

#### Step 2.2: Configure Environment

Copy the example `.env` file and update it:

```bash
cp .env.example .env
```

Open `.env` and configure PostgreSQL connection:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=book_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

#### Step 2.3: Generate Application Key

```bash
php artisan key:generate
```

#### Step 2.4: Run Migrations & Seeders

```bash
php artisan migrate:fresh
php artisan db:seed
```

This will:
- Create all database tables
- Seed 5 book categories
- Create test users (optional)

#### Step 2.5: Start Laravel Server

```bash
php artisan serve
```

Server will run on `http://localhost:8000`

---

### 3. Frontend Setup

#### Step 3.1: Install Dependencies

```bash
cd ../book-manage-frontend
npm install
```

If axios is not installed:

```bash
npm install axios
```

#### Step 3.2: Configure API Proxy (optional)

The frontend is configured to proxy API calls to the backend via `vite.config.js`. Verify it points to:

```javascript
proxy: {
  '/api': 'http://localhost:8000'
}
```

#### Step 3.3: Start Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🏃 Running the Application

### Terminal 1: Backend

```bash
cd book-management
php artisan serve
```

Runs on: `http://localhost:8000`

### Terminal 2: Frontend

```bash
cd book-manage-frontend
npm run dev
```

Runs on: `http://localhost:5173`

### Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

You will be redirected to the **Login Page**.

### Login with Demo Credentials

```
Email: test@example.com
Password: password
```

The credentials are pre-filled for easy testing. After login, you'll have access to the full Book Management interface.

---

## 🔌 API Endpoints

All endpoints return JSON and are prefixed with `/api`.

### Authentication

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/login` | No | Login and get JWT token |
| `GET` | `/me` | Yes | Get current user info |
| `POST` | `/logout` | Yes | Logout and invalidate token |

**Login Request Body:**

```json
{
  "email": "test@example.com",
  "password": "password"
}
```

**Login Response:**

```json
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**Using the Token:**

Add the token to the `Authorization` header for all protected requests:

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Categories

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET` | `/categories` | Yes | Get all book categories |

### Books

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET` | `/books` | Yes | Get all books (filterable by `category_id`) |
| `GET` | `/books/{id}` | Yes | Get single book |
| `POST` | `/books` | Yes | Create new book |
| `PUT` | `/books/{id}` | Yes | Update book |
| `DELETE` | `/books/{id}` | Yes | Delete book |

**Query Parameters:**
- `category_id` (optional): Filter books by category

**Example Request:**

```bash
GET /api/books?category_id=1
```

### Borrow & Return

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/borrow` | Yes | Record book borrow |
| `POST` | `/return` | Yes | Record book return |
| `GET` | `/borrow-records` | Yes | Get all borrow records |

**POST `/borrow` Body:**

```json
{
  "user_id": 1,
  "book_id": 1
}
```

**POST `/return` Body:**

```json
{
  "borrow_record_id": 1
}
```

### Users

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET` | `/users` | Yes | Get all users |

---

## 📊 Database Schema

### book_categories

| Column | Type | Notes |
|--------|------|-------|
| id | INT | Primary Key |
| name | VARCHAR(255) | Category name |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### books

| Column | Type | Notes |
|--------|------|-------|
| id | INT | Primary Key |
| title | VARCHAR(255) | Book title |
| author | VARCHAR(255) | Author name |
| price | DECIMAL(8,2) | Book price |
| stock | INT | Available quantity |
| book_category_id | INT | FK → book_categories |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### borrow_records

| Column | Type | Notes |
|--------|------|-------|
| id | INT | Primary Key |
| user_id | INT | FK → users |
| book_id | INT | FK → books |
| borrowed_at | TIMESTAMP | When borrowed |
| returned_at | TIMESTAMP NULL | When returned (NULL if not returned) |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### users

| Column | Type | Notes |
|--------|------|-------|
| id | INT | Primary Key |
| name | VARCHAR(255) | User name |
| email | VARCHAR(255) | User email |
| password | VARCHAR(255) | Hashed password |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

---

## 📝 Project Summary

### Backend Implementation

✅ **RESTful API** with proper HTTP methods and status codes  
✅ **JWT Authentication** with tymon/jwt-auth package  
✅ **PostgreSQL Database** with proper relationships and migrations  
✅ **Eloquent ORM** for database interactions  
✅ **Form Validation** using Laravel Form Requests  
✅ **Database Seeders** for demo data  
✅ **Relationship Management** (belongsTo, hasMany)  
✅ **Protected Routes** with auth:api middleware  
✅ **Exception Handling** for JWT token errors  

### Frontend Implementation

✅ **React Components** for modular UI  
✅ **JWT Login System** with LoginPage component  
✅ **Axios Interceptors** for automatic token injection  
✅ **State Management** using React hooks (useState, useEffect)  
✅ **Auto-Logout** on token expiration (401 errors)  
✅ **Category Filtering** for books  
✅ **CRUD Operations** integrated with backend  
✅ **Error Handling** with user-friendly messages  
✅ **Responsive Design** with CSS styling  
✅ **localStorage** for token persistence  

### Key Features Implemented

✅ **Authentication & Authorization** - JWT-based secure login  
✅ Book Management (Create, Read, Update, Delete)  
✅ Category Management (List & Filter)  
✅ Borrow/Return System with stock tracking  
✅ User tracking for borrowing  
✅ Data validation on both frontend and backend  
✅ Protected API endpoints requiring authentication  

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "Failed to connect to PostgreSQL"**
- Verify PostgreSQL is running
- Check `.env` database credentials
- Ensure database `book_db` exists

**Error: "Class not found"**
- Run `composer dump-autoload`

### Frontend Issues

**Error: "Failed to resolve import 'axios'"**
- Run `npm install axios`

**Error: "CORS errors"**
- Ensure backend is running on `http://localhost:8000`
- Verify vite.config.js proxy settings

**Error: "Cannot GET /api/..."**
- Check backend server is running
- Verify API endpoint URLs in `src/api/api.js`

---

## 📮 API Testing with Postman

### Postman Collection

A Postman collection is available for testing all API endpoints. Contact the author for access to the collection.

### Testing Flow

1. **Login First:**
   - Send POST request to `/api/login`
   - Use demo credentials: `test@example.com` / `password`
   - Copy the returned `token`

2. **Set Bearer Token (In Postman):**
   - In collection settings, go to **Authorization** tab
   - Type: **Bearer Token**
   - Token: Paste your JWT token
   - All requests will automatically include the token

3. **Test Endpoints:**
   - All protected endpoints now include the Authorization header
   - Try creating, reading, updating, deleting books
   - Test borrow/return functionality

4. **Logout:**
   - Send POST request to `/api/logout`
   - Token is invalidated
   - Protected routes will now return 401 Unauthorized

### Example Postman Request

```
GET /api/books
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
Content-Type: application/json
```

---

## 📄 License

This project is part of an assignment and is provided as-is.

---

## 👤 Author

**BimsaraWickramanayaka**

Repository: [Book_manage_system](https://github.com/BimsaraWickramanayaka/Book_manage_system)

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

## 📞 Support

If you encounter any issues, please:

1. Check the **Troubleshooting** section above
2. Review error messages carefully
3. Verify all prerequisites are installed
4. Check that both backend and frontend servers are running

---

**Last Updated:** December 2, 2025
