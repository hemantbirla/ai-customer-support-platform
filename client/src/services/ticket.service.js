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
  return api.get("/tickets", { params });
};

export const getTicketById = (ticketId) => {
  return api.get(`/tickets/${ticketId}`);
};

export const updateTicket = (ticketId, payload) => {
  return api.put(`/tickets/${ticketId}`, payload);
};

export const deleteTicket = (ticketId) => {
  return api.delete(`/tickets/${ticketId}`);
};

// ==========================================
// Ticket Workflow
// ==========================================

// Change ticket status
export const updateTicketStatus = (ticketId, status) => {
  return api.patch(`/tickets/${ticketId}/status`, {
    status,
  });
};

// Assign ticket to an agent
export const assignAgent = (ticketId, agentId) => {
  return api.patch(`/tickets/${ticketId}/assign`, {
    agentId,
  });
};

// Reopen a closed ticket
export const reopenTicket = (ticketId) => {
  return api.patch(`/tickets/${ticketId}/reopen`);
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
