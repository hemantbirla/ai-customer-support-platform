import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/logout", (req, res) => res.send("Logout route"));

router.post("/refresh", (req, res) => res.send("Refresh token route"));

router.get("/profile", (req, res) => res.send("Get profile route"));

router.put("/profile", (req, res) => res.send("Update profile route"));

export default router;
