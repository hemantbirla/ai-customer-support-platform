import chatService from "../services/chat.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// ==========================================
// Async Wrapper
// ==========================================

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ==========================================
// Get Conversation
// GET /api/chat/:ticketId
// ==========================================

export const getConversation = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  const conversation = await chatService.getConversation(
    ticketId,
    req.user,
    req.query,
  );

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        "Conversation fetched successfully",
        conversation,
      ),
    );
});

// ==========================================
// Send Message
// POST /api/chat/:ticketId
// ==========================================

export const sendMessage = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  const message = await chatService.sendMessage(ticketId, req.user, req.body);

  return res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        "Message sent successfully",
        message,
      ),
    );
});

// ==========================================
// Mark Read
// PUT /api/chat/read
// ==========================================

export const markRead = asyncHandler(async (req, res) => {
  const { messageIds } = req.body;

  const messages = await chatService.markRead(messageIds, req.user);

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, "Messages marked as read", messages),
    );
});
