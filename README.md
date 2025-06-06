# 🛍️ ProdManager - Full Stack MERN Product Management System

A complete product management application built with MongoDB, Express.js, React, and Node.js (MERN stack) featuring CRUD operations, Redux state management, form validation with Formik & Yup, and comprehensive API documentation.

### API Endpoints

| Method | Endpoint            | Description        | Body                                 |
| ------ | ------------------- | ------------------ | ------------------------------------ |
| GET    | `/api/products`     | Get all products   | None                                 |
| GET    | `/api/products/:id` | Get product by ID  | None                                 |
| POST   | `/api/products`     | Create new product | `{title, image, description, price}` |
| PUT    | `/api/products/:id` | Update product     | `{title, image, description, price}` |
| DELETE | `/api/products/:id` | Delete product     | None                                 |
| GET    | `/api/health`       | Health check       | None                                 |

## 🧰 Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Swagger** - API documentation
- **dotenv** - Environment variables

### Frontend

- **React** - UI library
- **Redux** - State management (manual setup)
- **React Router** - Routing
- **Formik** - Form handling
- **Yup** - Form validation
- **Axios** - HTTP client
- **React Bootstrap** - UI components
- **React-Toastify** - Notifications

## 📈 Project Status

✅ **Completed Features:**

- Backend API with all CRUD endpoints
- Frontend with Redux integration
- Form validation with Formik & Yup
- Swagger documentation
- Toast notifications
- Loading states and error handling
