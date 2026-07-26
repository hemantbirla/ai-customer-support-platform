import * as ticketService from "../services/ticket.service.js";
import asyncHandler from "../../../utils/asyncHandler.js";

export const createTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.createTicket(
    req.body,
    req.files,
    req.user,
  );
  console.log(req.files);
  return res.status(201).json({
    success: true,
    message: "Ticket created successfully",
    data: { ticket },
  });
});

export const getTickets = asyncHandler(async (req, res) => {
  const result = await ticketService.getTickets(req.query, req.user);

  return res.status(200).json({
    success: true,
    message: "Tickets fetched successfully",
    data: result,
  });
});

export const getTicketById = async (req, res, next) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id, req.user);

    return res.status(200).json({
      success: true,
      data: {
        ticket,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.updateTicket(
      req.params.id,
      req.body,
      req.user,
    );

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: {
        ticket,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    await ticketService.deleteTicket(req.params.id, req.user);

    return res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getTicketActivity = asyncHandler(async (req, res) => {
  const activities = await ticketService.getTicketActivity(
    req.params.id,
    req.user,
  );

  return res.status(200).json({
    success: true,
    data: {
      activities,
    },
  });
});
