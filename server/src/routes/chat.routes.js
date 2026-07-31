import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  getConversation,
  sendMessage,
  markRead,
} from "../controllers/chat.controller.js";

import {
  getConversationSchema,
  sendMessageSchema,
  markReadSchema,
} from "../validators/chat.validator.js";

const router = express.Router();

/*
=========================================
Conversation
=========================================
*/

router.get(
  "/:ticketId",
  authMiddleware,
  validate(getConversationSchema),
  getConversation,
);

/*
=========================================
Send Message
=========================================
*/

router.post(
  "/:ticketId",
  authMiddleware,
  validate(sendMessageSchema),
  sendMessage,
);

/*
=========================================
Read Receipt
=========================================
*/

router.put("/read", authMiddleware, validate(markReadSchema), markRead);

export default router;
