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

  const conversation = await chatService.getConversation(ticketId, req.user, {
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

  const message = await chatService.sendMessage(ticketId, req.user, {
    message: req.body.message,
    attachments: req.body.attachments || [],
  });

  const io = getIO();

  /*
  ================================================
  Broadcast new message
  ================================================
  */

  io.to(`ticket_${ticketId}`).emit("message:new", message);

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
  const messages = await chatService.markRead(req.body.messageIds, req.user);

  const io = getIO();

  /*
  ================================================
  Notify original sender
  ================================================
  */

  messages.forEach((message) => {
    const senderId = message.sender?._id?.toString();

    if (!senderId) {
      return;
    }

    console.log(`📖 Message read: ${message._id}`);

    console.log(`📤 Sending read event to user_${senderId}`);

    io.to(`user_${senderId}`).emit("message:read", {
      messageId: message._id.toString(),

      readAt: message.readAt,
    });
  });

  return res.json(new ApiResponse(200, "Messages marked as read", messages));
});

/*
==================================================
POST Upload Chat Attachments
==================================================
*/

export const uploadChatAttachments = asyncHandler(async (req, res) => {
  console.log("========== CHAT ATTACHMENT UPLOAD ==========");
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  console.log("============================================");

  const files = req.files || [];

  if (files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one attachment is required.",
    });
  }

  const attachments = files.map((file) => ({
    name: file.originalname,
    url: `/uploads/chat/${file.filename}`,
    type: file.mimetype,
    size: file.size,
  }));

  return res.status(200).json({
    success: true,
    message: "Attachments uploaded successfully.",
    data: attachments,
  });
});

export default {
  getConversation,
  sendMessage,
  markRead,
  uploadChatAttachments,
};
