import chatService from "../../services/chat.service.js";

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
      `🟢 ${socket.user.name} joined`,
      `ticket_${ticketId}`,
      socket.rooms,
    );

    await chatService.markDelivered(socket.user._id);
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
          receiver: payload.receiver,
          message: payload.message,
          attachments: payload.attachments || [],
        },
      );

      console.log("📤 Sending message to room:", `ticket_${payload.ticketId}`);
      console.log("📤 Message:", message);

      io.to(`ticket_${payload.ticketId}`).emit("message:new", message);

      callback?.({
        success: true,
        data: message,
      });
    } catch (error) {
      console.error(error);

      callback?.({
        success: false,
        message: error.message,
      });
    }
  });

  // ==========================================
  // Mark Read
  // ==========================================

  socket.on("mark-read", async ({ ticketId, messageIds }) => {
    try {
      const messages = await chatService.markRead(messageIds, socket.user);

      messages.forEach((message) => {
        io.to(`ticket_${ticketId}`).emit("message:read", {
          messageId: message._id,
          readAt: message.readAt,
        });
      });
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
