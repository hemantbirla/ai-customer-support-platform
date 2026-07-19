import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server running successfully",
  });
});

app.use("/api/auth", authRoutes);

export default app;
