import { body, param } from "express-validator";
import mongoose from "mongoose";

const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// ==========================================
// GET Conversation
// ==========================================

export const getConversationSchema = [
  param("ticketId").custom(isObjectId).withMessage("Invalid ticket id"),
];

// ==========================================
// Send Message
// ==========================================

export const sendMessageSchema = [
  param("ticketId").custom(isObjectId).withMessage("Invalid ticket id"),

  body("receiver").custom(isObjectId).withMessage("Invalid receiver id"),

  body("message")
    .optional()
    .isString()
    .isLength({ max: 5000 })
    .withMessage("Message cannot exceed 5000 characters"),

  body("attachments")
    .optional()
    .isArray({ max: 5 })
    .withMessage("Maximum 5 attachments allowed"),
];

// ==========================================
// Mark Read
// ==========================================

export const markReadSchema = [
  body("messageIds").isArray({ min: 1 }).withMessage("messageIds is required"),

  body("messageIds.*").custom(isObjectId).withMessage("Invalid message id"),
];
