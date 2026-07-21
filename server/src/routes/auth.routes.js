import express from "express";
import {
  register,
  login,
  refresh,
  logout,
  getProfile,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/logout", authMiddleware, logout);

router.post("/refresh", refresh);

router.get("/profile", authMiddleware, getProfile);

// router.post("/forgot-password", forgotPassword);

// router.post("/reset-password", resetPassword);

// router.post("/verify-email", verifyEmail);

export default router;
