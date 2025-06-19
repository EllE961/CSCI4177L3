# ProdManager Backend - Product Management API

A complete **Product Management REST API** built with **Node.js**, **Express**, **PostgreSQL**, **Sequelize**, and **JWT Authentication**.

## 🚀 Features

- ✅ **JWT-based Authentication** (Register & Login)
- ✅ **Protected Routes** with Authorization Middleware
- ✅ **CRUD Operations** for Products
- ✅ **Pagination, Sorting & Search** filtering
- ✅ **PostgreSQL Database** with Sequelize ORM
- ✅ **Input Validation** and Error Handling
- ✅ **Swagger API Documentation**
- ✅ **Password Hashing** with bcryptjs

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **PostgreSQL** database running
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd prodmanager-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure_for_production
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prodmanager
DB_USER=postgres
DB_PASSWORD=password
```

### 4. Database Setup
Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE prodmanager;
```

### 5. Run Database Migrations
```bash
npx sequelize-cli db:migrate
```

### 6. Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Swagger Documentation
Once the server is running, visit:
```
http://localhost:5000/api-docs
```

## 🔐 Authentication Endpoints

### Register User
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User  
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 📦 Product Endpoints

> **Note:** All product endpoints require JWT authentication. Include the token in the Authorization header:
> ```
> Authorization: Bearer <your-jwt-token>
> ```

### Get All Products (with Pagination & Search)
- **GET** `/api/products`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `sort` (optional): Sort field (default: createdAt)
  - `order` (optional): Sort order - ASC/DESC (default: DESC)
  - `keyword` (optional): Search in title and description

**Examples:**
```
GET /api/products
GET /api/products?page=2&limit=5
GET /api/products?sort=price&order=ASC
GET /api/products?keyword=laptop
GET /api/products?page=1&limit=10&sort=title&order=ASC&keyword=phone
```

### Get Single Product
- **GET** `/api/products/:id`

### Create Product
- **POST** `/api/products`
- **Body:**
```json
{
  "title": "MacBook Pro",
  "description": "High-performance laptop for professionals",
  "price": 1999.99,
  "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"
}
```

### Update Product
- **PUT** `/api/products/:id`
- **Body:**
```json
{
  "title": "Updated MacBook Pro",
  "description": "Updated description",
  "price": 2199.99,
  "image": "https://updated-image-url.com"
}
```

### Delete Product
- **DELETE** `/api/products/:id`

## 🧪 Testing with Postman

### 1. Register a New User
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/register`
- **Body (JSON):**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login to Get JWT Token
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Copy the `token` from the response.

### 3. Test Protected Product Routes
For all product endpoints, add the Authorization header:
- **Key:** `Authorization`
- **Value:** `Bearer <your-jwt-token>`

### 4. Create a Product
- **Method:** POST
- **URL:** `http://localhost:5000/api/products`
- **Headers:** 
  - `Authorization: Bearer <your-jwt-token>`
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "title": "Test Product",
  "description": "This is a test product",
  "price": 99.99,
  "image": "https://via.placeholder.com/400"
}
```

### 5. Test Pagination and Search
- **URL:** `http://localhost:5000/api/products?page=1&limit=5&keyword=test`

## 🏗️ Project Structure

```
prodmanager-backend/
├── config/
│   └── config.json          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── productController.js # Product CRUD operations
├── middleware/
│   └── authMiddleware.js    # JWT authentication middleware
├── migrations/
│   ├── create-user.js       # User table migration
│   └── create-product.js    # Product table migration
├── models/
│   ├── index.js            # Sequelize initialization
│   ├── user.js             # User model
│   └── product.js          # Product model
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── productRoutes.js    # Product routes
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── server.js              # Main application file
```

## 🛡️ Security Features

- **Password Hashing:** Using bcryptjs with salt rounds
- **JWT Tokens:** Secure token-based authentication
- **Input Validation:** Sequelize model validations
- **Protected Routes:** All product routes require authentication
- **SQL Injection Protection:** Sequelize ORM prevents SQL injection

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);
```

### Products Table
```sql
CREATE TABLE "Products" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  image VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);
```

## 🚀 Deployment

### Environment Variables for Production
```env
PORT=5000
JWT_SECRET=your_very_long_and_secure_production_jwt_secret_key
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
```

### Deploy to Railway/Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npx sequelize-cli db:migrate` - Run database migrations
- `npx sequelize-cli db:seed:all` - Run database seeders

## 🐛 Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Make sure database exists

### JWT Token Issues
1. Ensure JWT_SECRET is set in `.env`
2. Check token format in Authorization header
3. Verify token hasn't expired (24 hours)

### Migration Issues
1. Run `npx sequelize-cli db:migrate` 
2. Check database connection
3. Ensure migrations directory exists

## 📝 API Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message" // Only in development
}
```

## 🎯 Next Steps

- [ ] Add user roles and permissions
- [ ] Implement product categories
- [ ] Add file upload for product images
- [ ] Add rate limiting
- [ ] Implement caching with Redis
- [ ] Add comprehensive logging
- [ ] Write unit tests

---

## 📞 Support

If you encounter any issues, please check:
1. **Swagger Documentation:** `http://localhost:5000/api-docs`
2. **Health Check:** `http://localhost:5000/api/ping`
3. **Server Logs:** Check console output for errors

Happy coding! 🚀 