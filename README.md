# 🤖 AI Customer Support Platform

Enterprise-grade AI-powered Customer Support Platform built with the MERN Stack.

This application enables customers, support agents, and administrators to efficiently manage support tickets while leveraging Generative AI for ticket summarization, intelligent reply suggestions, automatic categorization, and priority detection.

---

## 🚀 Tech Stack

### Frontend

- React 19
- React Router
- Context API
- Axios
- React Hook Form
- Yup
- React Toastify
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Express Validator
- Helmet
- CORS

### AI

- Google Gemini API

---

## 📂 Project Structure

```
AI-Customer-Support-Platform/
│
├── client/
│
├── server/
│
└── README.md
```

---

## ✨ Features

### Authentication

- User Registration
- Secure Login
- JWT Authentication
- Refresh Token Flow
- Logout
- Forgot Password
- Reset Password
- Protected Routes
- Public Routes
- Role-Based Access Control

---

### User Roles

- Customer
- Support Agent
- Administrator

---

### Security

- Password Hashing (bcrypt)
- JWT Access Tokens
- Refresh Token Rotation
- Authentication Middleware
- Authorization Middleware
- Request Validation
- Helmet Security
- CORS Configuration
- Centralized Error Handling

---

## 🏗️ Architecture

### Backend

```
Routes
    ↓
Validation
    ↓
Controller
    ↓
Service
    ↓
Model
    ↓
MongoDB
```

---

### Frontend

```
Pages
    ↓
Context API
    ↓
Axios
    ↓
REST API
```

---

## 📌 REST APIs

### Authentication

```
POST    /api/auth/register

POST    /api/auth/login

POST    /api/auth/logout

POST    /api/auth/refresh

GET     /api/auth/profile

PUT     /api/auth/profile
```

---

## 📋 Completed

### Sprint 1

- Project Setup
- Routing
- Axios Configuration
- Authentication UI
- Shared Components
- Form Validation
- Toast Notifications

### Sprint 2

#### Backend

- User Model
- Authentication APIs
- JWT Authentication
- Refresh Token Flow
- Password Hashing
- Request Validation
- Error Handling
- Authentication Middleware
- Role Middleware

#### Frontend

- Login
- Register
- Forgot Password
- Reset Password
- React Hook Form
- Yup Validation
- Axios Interceptors
- Auth Context
- Protected Routes
- Role-Based Routing

---

## 🚧 Roadmap

- Dashboard
- Ticket Management
- AI Ticket Summary
- AI Reply Suggestions
- AI Ticket Categorization
- AI Priority Detection
- Chat Module
- Notifications
- Analytics Dashboard
- Admin Panel
- File Attachments
- Deployment
- CI/CD Pipeline

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>

cd AI-Customer-Support-Platform
```

---

### Client

```bash
cd client

npm install

npm run dev
```

---

### Server

```bash
cd server

npm install

npm run dev
```

---

## 🔐 Environment Variables

### Client

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

### Server

```env
PORT=5001

MONGO_URI=

JWT_SECRET=

JWT_REFRESH_SECRET=

CLIENT_URL=http://localhost:5173

GEMINI_API_KEY=
```

---

## 📖 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Hemant Birla
