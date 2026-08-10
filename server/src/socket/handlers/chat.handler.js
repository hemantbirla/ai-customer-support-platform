import chatService from "../../services/chat.service.js";

const registerChatHandlers = (io, socket) => {
  // ==========================================
  // Join Ticket
  // ==========================================

  socket.on("join-ticket", ({ ticketId }) => {
    if (!ticketId) return;

    const room = `ticket_${ticketId}`;

    socket.join(room);

    console.log(`🟢 ${socket.user.name} joined ${room}`);
  });

  // ==========================================
  // Leave Ticket
  // ==========================================

  socket.on("leave-ticket", ({ ticketId }) => {
    if (!ticketId) return;

    const room = `ticket_${ticketId}`;

    socket.leave(room);

    console.log(`🔴 ${socket.user.name} left ${room}`);
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

      const room = `ticket_${payload.ticketId}`;

      console.log(`📨 Broadcasting message to ${room}`);

      io.to(room).emit("message:new", message);

      callback?.({
        success: true,
        data: message,
      });
    } catch (error) {
      console.error("Send message error:", error);

      callback?.({
        success: false,
        message: error.message,
      });
    }
  });

  // ==========================================
  // Delivered
  // ==========================================

  socket.on("message:delivered", async ({ messageId }) => {
    try {
      const message = await chatService.markMessageDelivered(messageId);

      if (!message) return;

      const senderId = message.sender._id.toString();

      console.log(`📦 Message delivered: ${messageId}`);

      console.log(`📤 Sending delivered event to user_${senderId}`);

      io.to(`user_${senderId}`).emit("message:delivered", {
        messageId: message._id.toString(),
        deliveredAt: message.deliveredAt,
      });
    } catch (error) {
      console.error("Message delivered error:", error);
    }
  });

  // ==========================================
  // Mark Read
  // ==========================================

  socket.on("mark-read", async ({ ticketId, messageIds }) => {
    try {
      console.log("👀 SERVER mark-read:", messageIds);

      const messages = await chatService.markRead(messageIds, socket.user);

      console.log(`✅ Marked ${messages.length} messages as read`);

      // ==========================================
      // Notify Message Sender
      // ==========================================

      for (const message of messages) {
        const senderId = message.sender._id.toString();

        console.log("📤 Sending read event to:", senderId);

        io.to(`user_${senderId}`).emit("message:read", {
          messageId: message._id.toString(),
          readAt: message.readAt,
        });
      }
    } catch (error) {
      console.error("Mark read error:", error);
    }
  });

  // ==========================================
  // Typing Start
  // ==========================================

  socket.on("typing:start", ({ ticketId }) => {
    if (!ticketId) return;

    socket.to(`ticket_${ticketId}`).emit("typing", {
      user: socket.user,
      isTyping: true,
    });
  });

  // ==========================================
  // Typing Stop
  // ==========================================

  socket.on("typing:stop", ({ ticketId }) => {
    if (!ticketId) return;

    socket.to(`ticket_${ticketId}`).emit("typing", {
      user: socket.user,
      isTyping: false,
    });
  });
};

export default registerChatHandlers;
