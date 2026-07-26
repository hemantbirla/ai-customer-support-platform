import express from "express";
import authMiddleware from "../../../middleware/auth.middleware.js";

import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getTicketActivity,
} from "../controllers/ticket.controller.js";

import {
  createComment,
  getComments,
} from "../controllers/comment.controller.js";

import upload from "../../../middleware/upload.middleware.js";

const router = express.Router();

// =========================
// Ticket CRUD
// =========================
router.post("/", authMiddleware, upload.array("attachments", 5), createTicket);

router.get("/", authMiddleware, getTickets);

// =========================
// Ticket Comments
// =========================
router.post(
  "/:id/comments",
  authMiddleware,
  upload.array("attachments", 5),
  createComment,
);

router.get("/:id/comments", authMiddleware, getComments);

// =========================
// Ticket Activity
// =========================
router.get("/:id/activity", authMiddleware, getTicketActivity);

// =========================
// Single Ticket
// =========================
router.get("/:id", authMiddleware, getTicketById);

router.put("/:id", authMiddleware, updateTicket);

router.delete("/:id", authMiddleware, deleteTicket);

export default router;
