import { z } from "zod";
import {
  TICKET_CATEGORY,
  TICKET_PRIORITY,
  TICKET_STATUS,
} from "../constants/ticket.constants";

export const createTicketSchema = z.object({
  body: z
    .object({
      subject: z
        .string()
        .trim()
        .min(5, "Subject must be at least 5 characters")
        .max(150, "Subject cannot exceed 150 characters"),

      description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters"),

      category: z.enum(Object.values(TICKET_CATEGORY)),

      priority: z
        .enum(Object.values(TICKET_PRIORITY))
        .optional()
        .default(TICKET_PRIORITY.MEDIUM),

      tags: z.array(z.string().trim()).optional().default([]),
    })
    .strict(),

  query: z.object({}).optional(),

  params: z.object({}).optional(),
});

export const updateTicketSchema = z.object({
  body: z
    .object({
      subject: z
        .string()
        .trim()
        .min(5, "Subject must be at least 5 characters")
        .max(150, "Subject cannot exceed 150 characters")
        .optional(),

      description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters")
        .optional(),

      category: z.enum(Object.values(TICKET_CATEGORY)).optional(),

      priority: z.enum(Object.values(TICKET_PRIORITY)).optional(),

      status: z.enum(Object.values(TICKET_STATUS)).optional(),

      assignedAgent: z.string().trim().optional(),

      tags: z.array(z.string().trim()).optional(),
    })
    .strict(),

  params: z.object({
    id: z.string().trim().min(1, "Ticket id is required"),
  }),

  query: z.object({}).optional(),
});

export const ticketIdSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Ticket id is required"),
  }),

  body: z.object({}).optional(),

  query: z.object({}).optional(),
});

export const listTicketsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),

    limit: z.coerce.number().int().min(1).max(100).optional().default(10),

    status: z.enum(Object.values(TICKET_STATUS)).optional(),

    priority: z.enum(Object.values(TICKET_PRIORITY)).optional(),

    category: z.enum(Object.values(TICKET_CATEGORY)).optional(),

    assignedAgent: z.string().trim().optional(),

    search: z.string().trim().optional(),

    sort: z.string().trim().optional(),
  }),

  body: z.object({}).optional(),

  params: z.object({}).optional(),
});

export const addCommentSchema = z.object({
  body: z
    .object({
      message: z
        .string()
        .trim()
        .min(1, "Comment is required")
        .max(5000, "Comment cannot exceed 5000 characters"),

      isInternal: z.boolean().optional().default(false),
    })
    .strict(),

  params: z.object({
    id: z.string().trim().min(1, "Ticket id is required"),
  }),

  query: z.object({}).optional(),
});
