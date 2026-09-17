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

// ==========================================
// Upload Attachments
// ==========================================

export const uploadAttachments = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  console.log("📎 Uploading files:");

  for (const [key, value] of formData.entries()) {
    console.log("FormData:", {
      key,
      name: value?.name,
      type: value?.type,
      size: value?.size,
    });
  }

  const response = await axiosInstance.post("/chat/attachments", formData);

  return response.data;
};

// ==========================================
// Chat Service
// ==========================================

const chatService = {
  getConversation,
  sendMessage,
  markMessagesRead,
  uploadAttachments,
};

export default chatService;
