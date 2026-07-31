import chatService from "../services/chat.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getIO } from "../socket/socket.js";

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/*
==================================================
GET Conversation
==================================================
*/

export const getConversation = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  const { page, limit } = req.query;

  const conversation = await chatService.getConversation({
    ticketId,
    user: req.user,
    page,
    limit,
  });

  return res.json(
    new ApiResponse(200, "Conversation fetched successfully", conversation),
  );
});

/*
==================================================
POST Send Message
==================================================
*/

export const sendMessage = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  const message = await chatService.sendMessage({
    ticketId,
    sender: req.user,
    receiver: req.body.receiver,
    message: req.body.message,
    attachments: req.body.attachments || [],
  });

  // Emit to everyone in the ticket room
  const io = getIO();

  io.to(`ticket_${ticketId}`).emit("message:new", {
    ticketId,
    message,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", message));
});

/*
==================================================
PUT Mark Read
==================================================
*/

export const markRead = asyncHandler(async (req, res) => {
  const messages = await chatService.markRead(req.body.messageIds);

  const io = getIO();

  messages.forEach((message) => {
    io.to(`ticket_${message.ticketId}`).emit("message:read", {
      messageId: message._id,
      readAt: message.readAt,
    });
  });

  return res.json(new ApiResponse(200, "Messages marked as read", messages));
});
