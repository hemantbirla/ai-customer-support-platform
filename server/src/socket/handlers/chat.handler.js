import chatService from "../../services/chat.service.js";

/**
 * Register Chat Socket Events
 */
const registerChatHandlers = (io, socket) => {
  // ==========================================
  // Join Ticket Room
  // ==========================================

  socket.on("join-ticket", async ({ ticketId }) => {
    if (!ticketId) return;

    socket.join(`ticket_${ticketId}`);

    console.log(`${socket.user.name} joined ticket_${ticketId}`);

    await chatService.markDelivered(socket.user._id);

    io.to(`ticket_${ticketId}`).emit("user:online", {
      ticketId,
      userId: socket.user._id,
    });
  });

  // ==========================================
  // Leave Room
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
  // Mark Read
  // ==========================================

  socket.on("mark-read", async ({ ticketId, messageIds }) => {
    const messages = await chatService.markRead(messageIds, socket.user);

    io.to(`ticket_${ticketId}`).emit("message:read", messages);
  });

  // ==========================================
  // Typing Start
  // ==========================================

  socket.on("typing:start", ({ ticketId }) => {
    socket.to(`ticket_${ticketId}`).emit("typing", {
      user: socket.user,
      isTyping: true,
    });
  });

  // ==========================================
  // Typing Stop
  // ==========================================

  socket.on("typing:stop", ({ ticketId }) => {
    socket.to(`ticket_${ticketId}`).emit("typing", {
      user: socket.user,
      isTyping: false,
    });
  });
};

export default registerChatHandlers;
