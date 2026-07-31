import { z } from "zod";
import mongoose from "mongoose";

const objectIdSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  });

// ==========================================
// Get Conversation
// ==========================================

export const getConversationSchema = z.object({
  params: z.object({
    ticketId: objectIdSchema,
  }),

  query: z.object({
    page: z.coerce.number().min(1).default(1).optional(),

    limit: z.coerce.number().min(1).max(100).default(20).optional(),
  }),

  body: z.object({}).optional(),
});

// ==========================================
// Send Message
// ==========================================

export const sendMessageSchema = z.object({
  params: z.object({
    ticketId: objectIdSchema,
  }),

  body: z.object({
    receiver: objectIdSchema,

    message: z
      .string()
      .trim()
      .max(5000, "Message cannot exceed 5000 characters")
      .optional(),

    attachments: z
      .array(
        z.object({
          url: z.string(),

          fileName: z.string(),

          fileType: z.string(),

          fileSize: z.number(),
        }),
      )
      .max(5)
      .optional()
      .default([]),
  }),

  query: z.object({}).optional(),
});

// ==========================================
// Mark Read
// ==========================================

export const markReadSchema = z.object({
  body: z.object({
    messageIds: z.array(objectIdSchema).min(1),
  }),

  params: z.object({}).optional(),

  query: z.object({}).optional(),
});
