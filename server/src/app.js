import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";

const app = express();

// -------------------------
// Global Middlewares
// -------------------------

// 1. Apply Helmet security headers
app.use(helmet());

// 2. Configure CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200, // Legacy browsers compatibility
  }),
);

// 3. Body parsers & cookie handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -------------------------
// Health Check
// -------------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// -------------------------
// API Routes
// -------------------------
app.use("/api/auth", authRoutes);

// -------------------------
// 404 & Error Middlewares
// -------------------------
app.use(notFound);
app.use(errorHandler);

export default app;
