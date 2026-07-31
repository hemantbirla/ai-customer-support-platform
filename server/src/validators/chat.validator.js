import { body, param } from "express-validator";
import mongoose from "mongoose";

const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const sendMessageValidator = [
  param("ticketId").custom(isObjectId).withMessage("Invalid ticket id"),

  body("receiver")
    .notEmpty()
    .withMessage("Receiver is required")
    .custom(isObjectId)
    .withMessage("Invalid receiver id"),

  body("message")
    .optional()
    .trim()
    .isLength({
      max: 5000,
    })
    .withMessage("Message cannot exceed 5000 characters"),

  body("attachments")
    .optional()
    .isArray({
      max: 5,
    })
    .withMessage("Maximum 5 attachments allowed"),
];

export const conversationValidator = [
  param("ticketId").custom(isObjectId).withMessage("Invalid ticket id"),
];

export const markReadValidator = [
  body("messageIds")
    .isArray({
      min: 1,
    })
    .withMessage("messageIds is required"),

  body("messageIds.*").custom(isObjectId).withMessage("Invalid message id"),
];
