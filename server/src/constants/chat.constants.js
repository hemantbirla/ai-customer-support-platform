// ==========================================
// Message Status
// ==========================================

export const MESSAGE_STATUS = Object.freeze({
  SENT: "SENT",
  DELIVERED: "DELIVERED",
  READ: "READ",
});

// ==========================================
// Socket Events
// ==========================================

export const CHAT_EVENTS = Object.freeze({
  CONNECTION: "connection",

  JOIN_TICKET: "join-ticket",
  LEAVE_TICKET: "leave-ticket",

  SEND_MESSAGE: "send-message",

  MESSAGE_NEW: "message:new",

  MARK_READ: "mark-read",
  MESSAGE_READ: "message:read",

  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",

  USER_ONLINE: "user:online",
  USER_OFFLINE: "user:offline",
});

// ==========================================
// Notification Types
// ==========================================

export const NOTIFICATION_TYPES = Object.freeze({
  NEW_MESSAGE: "NEW_MESSAGE",
  NEW_TICKET: "NEW_TICKET",
  NEW_REPLY: "NEW_REPLY",
  TICKET_ASSIGNED: "TICKET_ASSIGNED",
  STATUS_CHANGED: "STATUS_CHANGED",
  PRIORITY_CHANGED: "PRIORITY_CHANGED",
  AI_SUMMARY_READY: "AI_SUMMARY_READY",
  AI_REPLY_READY: "AI_REPLY_READY",
});
