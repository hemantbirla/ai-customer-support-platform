import express from "express";

import authMiddleware from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import ownership from "../../../middleware/ownership.middleware.js";
import workflowMiddleware from "../../../middleware/workflow.middleware.js";
import upload from "../../../middleware/upload.middleware.js";

import { PERMISSIONS } from "../../../constants/permissions.constants.js";

import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getTicketActivity,
  updateTicketStatus,
  assignAgent,
} from "../controllers/ticket.controller.js";

import {
  createComment,
  getComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

// =========================
// Ticket CRUD
// =========================

router.post(
  "/",
  authMiddleware,
  authorize(PERMISSIONS.CREATE_TICKET),
  upload.array("attachments", 5),
  createTicket,
);

router.get("/", authMiddleware, getTickets);

router.get("/:ticketId", authMiddleware, ownership, getTicketById);

router.put(
  "/:ticketId",
  authMiddleware,
  ownership,
  authorize(PERMISSIONS.EDIT_TICKET),
  updateTicket,
);

router.delete(
  "/:ticketId",
  authMiddleware,
  ownership,
  authorize(PERMISSIONS.DELETE_TICKET),
  deleteTicket,
);

// =========================
// Workflow
// =========================

router.patch(
  "/:ticketId/status",
  authMiddleware,
  ownership,
  authorize(PERMISSIONS.CHANGE_STATUS),
  workflowMiddleware,
  updateTicketStatus,
);

router.patch(
  "/:ticketId/assign",
  authMiddleware,
  authorize(PERMISSIONS.ASSIGN_AGENT),
  assignAgent,
);

// =========================
// Comments
// =========================

router.post(
  "/:ticketId/comments",
  authMiddleware,
  upload.array("attachments", 5),
  createComment,
);

router.get("/:ticketId/comments", authMiddleware, getComments);

// =========================
// Activity
// =========================

router.get("/:ticketId/activity", authMiddleware, getTicketActivity);

export default router;
