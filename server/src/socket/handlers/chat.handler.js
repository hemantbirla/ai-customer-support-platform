import Ticket from "../../modules/tickets/models/Ticket.js";

import { CHAT_EVENTS } from "../events/chat.events.js";

import { getTicketRoom } from "../utils/room.utils.js";

export const registerChatHandler = (io, socket) => {
  /**
   * Join Ticket Room
   */
  socket.on(CHAT_EVENTS.JOIN_TICKET, async ({ ticketId }) => {
    try {
      const ticket = await Ticket.findById(ticketId);

      if (!ticket) {
        return;
      }

      const userId = socket.user.id;

      const isAllowed =
        ticket.customer?.toString() === userId ||
        ticket.assignedAgent?.toString() === userId ||
        socket.user.role === "ADMIN";

      if (!isAllowed) {
        console.log(`❌ Unauthorized room join by ${socket.user.name}`);

        return;
      }

      const room = getTicketRoom(ticketId);

      socket.join(room);

      console.log(`✅ ${socket.user.name} joined ${room}`);
    } catch (error) {
      console.error(error);
    }
  });

  /**
   * Leave Room
   */
  socket.on(CHAT_EVENTS.LEAVE_TICKET, ({ ticketId }) => {
    const room = getTicketRoom(ticketId);

    socket.leave(room);

    console.log(`🚪 ${socket.user.name} left ${room}`);
  });
};
