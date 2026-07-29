import api from "../api/axiosInstance";

// ==========================================
// Tickets
// ==========================================

export const createTicket = (formData) => {
  return api.post("/tickets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTickets = (params = {}) => {
  return api.get("/tickets", {
    params,
  });
};

export const getTicketById = (ticketId) => {
  return api.get(`/tickets/${ticketId}`);
};

export const updateTicket = (ticketId, formData) => {
  return api.put(`/tickets/${ticketId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteTicket = (ticketId) => {
  return api.delete(`/tickets/${ticketId}`);
};

// ==========================================
// Comments
// ==========================================

export const addComment = (ticketId, formData) => {
  return api.post(`/tickets/${ticketId}/comments`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getComments = (ticketId) => {
  return api.get(`/tickets/${ticketId}/comments`);
};

// ==========================================
// Activity
// ==========================================

export const getActivityLogs = (ticketId) => {
  return api.get(`/tickets/${ticketId}/activity`);
};

// ==========================================
// Attachments
// ==========================================

export const uploadAttachments = (ticketId, formData) => {
  return api.post(`/tickets/${ticketId}/attachments`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
