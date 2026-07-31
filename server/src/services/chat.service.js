import mongoose from "mongoose";

import Message from "../models/Message.js";
import Ticket from "../models/Ticket.js";

import ApiError from "../utils/ApiError.js";

import { STATUS_CODES } from "../constants/statusCodes.js";

import { getPagination, buildPaginationResponse } from "../utils/pagination.js";

import { canAccessTicket } from "../utils/permission.utils.js";

// Load Ticket
const getTicketOrThrow = async (ticketId) => {
  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid ticket id");
  }

  const ticket = await Ticket.findById(ticketId)
    .populate("customer", "name email avatar role")
    .populate("assignedAgent", "name email avatar role");

  if (!ticket) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Ticket not found");
  }

  return ticket;
};

// Verify Permission
const verifyConversationAccess = (user, ticket) => {
  const hasAccess = canAccessTicket(user, ticket);

  if (!hasAccess) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      "You are not authorized to access this conversation",
    );
  }
};

// Build Populate Query
const MESSAGE_POPULATE = [
  {
    path: "sender",
    select: "name email avatar role",
  },
  {
    path: "receiver",
    select: "name email avatar role",
  },
];

// Common Sort
const DEFAULT_SORT = {
  createdAt: -1,
};

// Service Skeleton
class ChatService {
  /**
   * Get ticket conversation
   */
  async getConversation(ticketId, user, query = {}) {
    // ==============================
    // Validate Ticket
    // ==============================

    const ticket = await getTicketOrThrow(ticketId);

    // ==============================
    // Permission Check
    // ==============================

    verifyConversationAccess(user, ticket);

    // ==============================
    // Pagination
    // ==============================

    const { page, limit, skip } = getPagination(query);

    // ==============================
    // Total Messages
    // ==============================

    const total = await Message.countDocuments({
      ticketId: ticket._id,
    });

    // ==============================
    // Fetch Messages
    // ==============================

    const messages = await Message.find({
      ticketId: ticket._id,
    })
      .populate(MESSAGE_POPULATE)
      .sort(DEFAULT_SORT)
      .skip(skip)
      .limit(limit)
      .lean();

    // ==============================
    // Pagination Response
    // ==============================

    return buildPaginationResponse({
      data: messages,
      total,
      page,
      limit,
    });
  }

  /**
   * Send Message
   */
  async sendMessage(ticketId, user, payload) {
    // ==============================
    // Validate Ticket
    // ==============================

    const ticket = await getTicketOrThrow(ticketId);

    // ==============================
    // Permission Check
    // ==============================

    verifyConversationAccess(user, ticket);

    const { receiver, message, attachments = [] } = payload;

    // ==============================
    // Validate Content
    // ==============================

    if ((!message || message.trim().length === 0) && attachments.length === 0) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Message or attachment is required",
      );
    }

    // ==============================
    // Receiver Validation
    // ==============================

    if (!mongoose.Types.ObjectId.isValid(receiver)) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid receiver id");
    }

    // ==============================
    // Create Message
    // ==============================

    const chatMessage = await Message.create({
      ticketId: ticket._id,
      sender: user._id,
      receiver,
      message: message?.trim() || "",
      attachments,
    });

    // ==============================
    // Populate Users
    // ==============================

    const populatedMessage = await Message.findById(chatMessage._id)
      .populate(MESSAGE_POPULATE)
      .lean();

    // ==============================
    // Return
    // ==============================

    return populatedMessage;
  }

  /**
   * Mark Messages as Read
   */
  async markRead(messageIds, user) {
    if (!Array.isArray(messageIds) || messageIds.length === 0) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "Message ids are required");
    }

    const validIds = messageIds.filter((id) =>
      mongoose.Types.ObjectId.isValid(id),
    );

    if (validIds.length === 0) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid message ids");
    }

    const now = new Date();

    await Message.updateMany(
      {
        _id: { $in: validIds },
        receiver: user._id,
        readAt: null,
      },
      {
        $set: {
          readAt: now,
        },
      },
    );

    const updatedMessages = await Message.find({
      _id: { $in: validIds },
    })
      .populate(MESSAGE_POPULATE)
      .lean();

    return updatedMessages;
  }

  /**
   * Mark Messages as Delivered
   */
  async markDelivered(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return;
    }

    const now = new Date();

    await Message.updateMany(
      {
        receiver: userId,
        deliveredAt: null,
      },
      {
        $set: {
          deliveredAt: now,
        },
      },
    );
  }
}

const chatService = new ChatService();

export default chatService;
