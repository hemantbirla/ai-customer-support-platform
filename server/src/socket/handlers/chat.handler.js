import chatService from "../../services/chat.service.js";

/**
 * Register Chat Socket Events
 */
const registerChatHandlers = (io, socket) => {
  /**
   * Join Ticket Room
   */
  socket.on("join-ticket", async ({ ticketId }) => {
    if (!ticketId) return;

    socket.join(`ticket_${ticketId}`);

    console.log(`${socket.user.name} joined ticket_${ticketId}`);

    // Mark pending messages delivered
    await chatService.markDelivered(socket.user._id);

    io.to(`ticket_${ticketId}`).emit("user:online", {
      userId: socket.user._id,
      ticketId,
    });
  });

  /**
   * Leave Ticket Room
   */
  socket.on("leave-ticket", ({ ticketId }) => {
    socket.leave(`ticket_${ticketId}`);

    console.log(`${socket.user.name} left ticket_${ticketId}`);
  });

  /**
   * Send Message
   */
  socket.on("send-message", async (payload, callback) => {
    try {
      const { ticketId } = payload;

      const message = await chatService.sendMessage(
        ticketId,
        socket.user,
        payload,
      );

      io.to(`ticket_${ticketId}`).emit("message:new", message);

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

  /**
   * Mark Read
   */
  socket.on("mark-read", async ({ messageIds, ticketId }) => {
    const messages = await chatService.markRead(messageIds, socket.user);

    io.to(`ticket_${ticketId}`).emit("message:read", messages);
  });

  /**
   * Typing Start
   */
  socket.on("typing:start", ({ ticketId }) => {
    socket.to(`ticket_${ticketId}`).emit("typing", {
      user: socket.user,
      isTyping: true,
    });
  });

  /**
   * Typing Stop
   */
  socket.on("typing:stop", ({ ticketId }) => {
    socket.to(`ticket_${ticketId}`).emit("typing", {
      user: socket.user,
      isTyping: false,
    });
  });
};

export default registerChatHandlers;
