import axiosInstance from "../api/axiosInstance";
// ==========================================
// Get Conversation
// ==========================================

export const getConversation = async (ticketId, page = 1, limit = 50) => {
  const response = await axiosInstance.get(`/chat/${ticketId}`, {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

// ==========================================
// Send Message
// ==========================================

export const sendMessage = async (ticketId, payload) => {
  const response = await axiosInstance.post(`/chat/${ticketId}`, payload);

  return response.data;
};

// ==========================================
// Mark Messages Read
// ==========================================

export const markMessagesRead = async (messageIds) => {
  const response = await axiosInstance.put("/chat/read", {
    messageIds,
  });

  return response.data;
};

const chatService = {
  getConversation,
  sendMessage,
  markMessagesRead,
};

export default chatService;
