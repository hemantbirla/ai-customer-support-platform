import Ticket from "../modules/tickets/models/Ticket.js";
import { canAccessTicket } from "../utils/permission.utils.js";

const ownership = async (req, res, next) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findOne({
      _id: ticketId,
      deletedAt: null,
    })
      .populate("customer")
      .populate("assignedAgent");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    if (!canAccessTicket(req.user, ticket)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    req.ticket = ticket;

    next();
  } catch (error) {
    next(error);
  }
};

export default ownership;
