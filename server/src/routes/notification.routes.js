import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getNotifications,
  markRead,
  markAllRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getNotifications);

router.put("/:id/read", markRead);

router.put("/read-all", markAllRead);

console.log("notification.routes.js loaded");

export default router;
