import chatService from "../../services/chat.service.js";
import { getOnlineUsers } from "../socket.js";

/**
 * Register Chat Socket Events
 */
const registerChatHandlers = (io, socket) => {
  // ==========================================
  // Join Ticket
  // ==========================================

  socket.on("join-ticket", async ({ ticketId }) => {
    if (!ticketId) return;

    socket.join(`ticket_${ticketId}`);

    console.log(
      `🟢 ${socket.user.name} joined ticket_${ticketId}`,
      socket.rooms,
    );
  });

  // ==========================================
  // Leave Ticket
  // ==========================================

  socket.on("leave-ticket", ({ ticketId }) => {
    socket.leave(`ticket_${ticketId}`);

    console.log(`${socket.user.name} left ticket_${ticketId}`);
  });

  // ==========================================
  // Send Message
  // ==========================================

  socket.on("send-message", async (payload, callback) => {
    try {
      const message = await chatService.sendMessage(
        payload.ticketId,
        socket.user,
        {
          message: payload.message,
          attachments: payload.attachments || [],
        },
      );

      io.to(`ticket_${payload.ticketId}`).emit("message:new", message);

      callback?.({
        success: true,
        data: message,
      });
    } catch (error) {
      callback?.({
        success: false,
        message: error.message,
      });
    }
  });

  // ==========================================
  // Message Delivered
  // ==========================================

  socket.on("message:delivered", async ({ messageId }) => {
    try {
      const message = await chatService.markMessageDelivered(messageId);

      if (!message) return;

      const onlineUsers = getOnlineUsers();

      const senderSocketId = onlineUsers.get(message.sender._id.toString());

      if (senderSocketId) {
        socket.emit("message:delivered", {
          messageId: message._id,
        });
      }
    } catch (err) {
      console.error(err);
    }
  });

  // ==========================================
  // Mark Read
  // ==========================================

  socket.on("mark-read", async ({ ticketId, messageIds }) => {
    try {
      const messages = await chatService.markRead(messageIds, socket.user);

      const onlineUsers = getOnlineUsers();

      for (const message of messages) {
        const senderSocketId = onlineUsers.get(message.sender._id.toString());

        if (senderSocketId) {
          io.to(senderSocketId).emit("message:read", {
            messageId: message._id.toString(),
            readAt: message.readAt,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  // ==========================================
  // Typing
  // ==========================================

  socket.on("typing:start", ({ ticketId }) => {
    socket.to(`ticket_${ticketId}`).emit("typing", {
      user: socket.user,
      isTyping: true,
    });
  });

  socket.on("typing:stop", ({ ticketId }) => {
    socket.to(`ticket_${ticketId}`).emit("typing", {
      user: socket.user,
      isTyping: false,
    });
  });
};

export default registerChatHandlers;
