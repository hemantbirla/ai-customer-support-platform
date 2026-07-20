import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";

const app = express();
app.use(express.json());
// -------------------------
// Global Middlewares
// -------------------------
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

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
// 404 Middleware
// -------------------------
app.use(notFound);

// -------------------------
// Global Error Handler
// -------------------------
app.use(errorHandler);

export default app;
