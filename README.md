# 🛍️ ProdManager - Full Stack MERN Product Management System

A complete product management application built with PostgreSQL, Express.js, React, and Node.js featuring CRUD operations, user registration form with validation, Redux state management, and comprehensive API documentation.

### API Endpoints

| Method | Endpoint            | Description        | Body                                 |
| ------ | ------------------- | ------------------ | ------------------------------------ |
| GET    | `/api/products`     | Get all products   | None                                 |
| GET    | `/api/products/:id` | Get product by ID  | None                                 |
| POST   | `/api/products`     | Create new product | `{title, image, description, price}` |
| PUT    | `/api/products/:id` | Update product     | `{title, image, description, price}` |
| DELETE | `/api/products/:id` | Delete product     | None                                 |
| GET    | `/api/ping`         | Health check       | Returns "pong"                       |
| GET    | `/api/health`       | API health status  | Database connection status           |

## 🧰 Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM for database operations
- **CORS** - Cross-origin resource sharing
- **Swagger** - API documentation
- **dotenv** - Environment variables
- **JWT & Bcrypt** - Authentication utilities

### Frontend

- **React** - UI library
- **Redux** - State management (manual setup)
- **React Router** - Routing
- **Formik** - Form handling
- **Yup** - Form validation
- **Axios** - HTTP client
- **React Bootstrap** - UI components
- **Bootstrap Icons** - Icon library
- **React-Toastify** - Notifications

## 📈 Project Status

✅ **Completed Features:**

- Backend API with all CRUD endpoints using PostgreSQL & Sequelize
- Frontend with Redux integration
- Registration form with comprehensive validation (fullName, email, phone, password, confirmPassword)
- Form validation with Formik & Yup
- Swagger documentation
- Toast notifications
- Loading states and error handling
- Responsive Bootstrap UI design
- Database seeding for initial products
- Production-ready deployment configuration

## 🚀 Deployment

**Backend:** Deployed on Render with PostgreSQL database
**Frontend:** Ready for deployment on Netlify/Vercel
**Database:** PostgreSQL hosted on Render

## 📝 Registration Form Features

- **Full Name** validation (2-50 characters, required)
- **Email** validation (valid format, required)
- **Phone** validation (10-15 digits, required)
- **Password** validation (minimum 6 characters, required)
- **Confirm Password** validation (must match password, required)
- Real-time field validation with error messages
- Loading states and success notifications
- Responsive design with Bootstrap styling
