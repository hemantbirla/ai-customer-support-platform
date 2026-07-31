// ==========================================
// Ticket Room
// ==========================================

export const getTicketRoom = (ticketId) => {
  return `ticket_${ticketId}`;
};

// ==========================================
// User Private Room
// ==========================================

export const getUserRoom = (userId) => {
  return `user_${userId}`;
};
