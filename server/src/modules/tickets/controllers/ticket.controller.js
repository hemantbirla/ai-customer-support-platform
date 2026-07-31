import * as ticketService from "../services/ticket.service.js";
import asyncHandler from "../../../utils/asyncHandler.js";

// ==========================================
// Create Ticket
// ==========================================

export const createTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.createTicket(
    req.body,
    req.files,
    req.user,
  );

  return res.status(201).json({
    success: true,
    message: "Ticket created successfully",
    data: { ticket },
  });
});

// ==========================================
// Get All Tickets
// ==========================================

export const getTickets = asyncHandler(async (req, res) => {
  const result = await ticketService.getTickets(req.query, req.user);

  return res.status(200).json({
    success: true,
    message: "Tickets fetched successfully",
    data: result,
  });
});

// ==========================================
// Get Ticket By Id
// ==========================================

export const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await ticketService.getTicketById(
    req.params.ticketId,
    req.user,
  );

  return res.status(200).json({
    success: true,
    data: { ticket },
  });
});

// ==========================================
// Update Ticket
// ==========================================

export const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.updateTicket(
    req.params.ticketId,
    req.body,
    req.user,
  );

  return res.status(200).json({
    success: true,
    message: "Ticket updated successfully",
    data: { ticket },
  });
});

// ==========================================
// Update Ticket Status
// ==========================================

export const updateTicketStatus = asyncHandler(async (req, res) => {
  const ticket = await ticketService.updateTicketStatus(
    req.params.ticketId,
    req.body.status,
    req.user,
  );

  return res.status(200).json({
    success: true,
    message: "Ticket status updated successfully",
    data: { ticket },
  });
});

// ==========================================
// Assign Agent
// ==========================================

export const assignAgent = asyncHandler(async (req, res) => {
  const ticket = await ticketService.assignAgent(
    req.params.ticketId,
    req.body.agentId,
    req.user,
  );

  return res.status(200).json({
    success: true,
    message: "Agent assigned successfully",
    data: { ticket },
  });
});

// ==========================================
// Delete Ticket
// ==========================================

export const deleteTicket = asyncHandler(async (req, res) => {
  await ticketService.deleteTicket(req.params.ticketId, req.user);

  return res.status(200).json({
    success: true,
    message: "Ticket deleted successfully",
  });
});

// ==========================================
// Ticket Activity
// ==========================================

export const getTicketActivity = asyncHandler(async (req, res) => {
  const activities = await ticketService.getTicketActivity(
    req.params.ticketId,
    req.user,
  );

  return res.status(200).json({
    success: true,
    data: { activities },
  });
});
