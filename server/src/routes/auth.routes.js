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

router.post("/logout", logout);

router.post("/refresh", refresh);

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", (req, res) => res.send("Update profile route"));

export default router;
