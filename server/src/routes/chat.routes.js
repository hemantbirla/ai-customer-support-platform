import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  getConversation,
  sendMessage,
  markRead,
  uploadChatAttachments,
} from "../controllers/chat.controller.js";

import {
  getConversationSchema,
  sendMessageSchema,
  markReadSchema,
} from "../validators/chat.validator.js";

import uploadChatFile from "../middleware/upload.middleware.js";

const router = express.Router();

/*
=========================================
Upload Chat Attachments
=========================================
IMPORTANT:

This route MUST come before:

/:ticketId

Otherwise:

/chat/attachments

will be interpreted as:

ticketId = "attachments"

and sendMessageSchema will run.
=========================================
*/

router.post(
  "/attachments",
  authMiddleware,
  uploadChatFile.array("files", 5),
  uploadChatAttachments,
);

/*
=========================================
Read Receipt
=========================================
*/

router.put("/read", authMiddleware, validate(markReadSchema), markRead);

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

export default router;
