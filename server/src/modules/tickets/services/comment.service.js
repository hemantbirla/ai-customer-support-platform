import Comment from "../models/Comment.js";
import Ticket from "../models/Ticket.js";

import { createActivity } from "./activity.service.js";
import { ACTIVITY_ACTION } from "../constants/activity.constants.js";

import { getTicketById } from "./ticket.service.js";

/**
 * Create Comment / Internal Note
 */
export const createComment = async (ticketId, payload, files, user) => {
  // Verify ticket exists & RBAC
  const ticket = await getTicketById(ticketId, user);

  const { message, isInternal = false } = payload;

  // Customer cannot add internal notes
  if (isInternal && user.role === "CUSTOMER") {
    const error = new Error(
      "Customers are not allowed to create internal notes",
    );
    error.statusCode = 403;
    throw error;
  }

  const attachments =
    files?.map((file) => ({
      originalName: file.originalname,
      storedName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/tickets/${file.filename}`,
    })) || [];

  const comment = await Comment.create({
    ticket: ticket._id,
    author: user.id,
    message,
    isInternal,
    attachments,
  });

  await createActivity({
    ticket: ticket._id,
    action: isInternal
      ? ACTIVITY_ACTION.INTERNAL_NOTE_ADDED
      : ACTIVITY_ACTION.COMMENT_ADDED,
    user: user.id,
  });

  return Comment.findById(comment._id)
    .populate("author", "firstName lastName email role")
    .lean();
};

/**
 * Get Ticket Comments
 */
export const getComments = async (ticketId, user) => {
  // Reuse existing RBAC
  await getTicketById(ticketId, user);

  const query = {
    ticket: ticketId,
  };

  // Customers cannot see internal notes
  if (user.role === "CUSTOMER") {
    query.isInternal = false;
  }

  const comments = await Comment.find(query)
    .populate("author", "firstName lastName email role")
    .sort({ createdAt: 1 })
    .lean();

  return comments;
};
