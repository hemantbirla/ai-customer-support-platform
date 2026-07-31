import { isValidStatusTransition } from "../utils/workflow.utils.js";

const validateWorkflow = (req, res, next) => {
  try {
    const ticket = req.ticket;

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    const { status } = req.body;

    // If status isn't being updated, continue
    if (!status) {
      return next();
    }

    // Same status is allowed
    if (ticket.status === status) {
      return next();
    }

    const valid = isValidStatusTransition(ticket.status, status);

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition from ${ticket.status} to ${status}.`,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateWorkflow;
