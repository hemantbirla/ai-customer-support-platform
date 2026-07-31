// ==========================================
// Chat Socket Events
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

  TYPING: "typing",
});
