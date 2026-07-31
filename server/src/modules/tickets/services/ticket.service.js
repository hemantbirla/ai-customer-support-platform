import Ticket from "../models/Ticket.js";
import notificationService from "../../../services/notification.service.js";
import { getIO } from "../../../socket/socket.js";
import { NOTIFICATION_TYPES } from "../../../constants/notification.constants.js";
import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  TICKET_CATEGORY,
} from "../constants/ticket.constants.js";
import {
  canAccessTicket,
  canEditTicket,
  canDeleteTicket,
  canAssignTicket,
  canChangePriority,
  canChangeStatus,
  isAdmin,
  isAgent,
  isCustomer,
} from "../../../utils/permission.utils.js";
import generateTicketNumber from "../../../utils/generateTicketNumber.js";
import { canTransitionStatus } from "../utils/ticketWorkflow.js";
import User from "../../../models/User.js";
import { createActivity } from "./activity.service.js";
import { ACTIVITY_ACTION } from "../constants/activity.constants.js";
import Activity from "../models/Activity.js";
import { ROLES } from "../../../constants/roles.constants.js";

// ==========================================
// Create Ticket
// ==========================================
export const createTicket = async (ticketData, files, user) => {
  const { subject, description, category, priority } = ticketData;
  const ticketNumber = await generateTicketNumber();

  // attachments array
  const attachments =
    files?.map((file) => ({
      originalName: file.originalname,
      storedName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/tickets/${file.filename}`,
    })) || [];

  const ticket = await Ticket.create({
    ticketNumber,
    subject,
    description,
    customer: user.id,
    assignedAgent: null,
    category: category || TICKET_CATEGORY.GENERAL,
    priority: priority || TICKET_PRIORITY.MEDIUM,
    status: TICKET_STATUS.OPEN,
    attachments,
    tags: [],
    deletedAt: null,
    deletedBy: null,
  });

  await createActivity({
    ticket: ticket._id,
    action: ACTIVITY_ACTION.TICKET_CREATED,
    user: user.id,
  });

  const io = getIO();

  const recipients = await User.find({
    role: { $in: [ROLES.ADMIN, ROLES.AGENT] },
  }).select("_id");

  await Promise.all(
    recipients.map((recipient) =>
      notificationService.createNotification(
        {
          user: recipient._id,
          title: "New Ticket Created",
          message: `${user.name} created ticket ${ticket.ticketNumber}`,
          type: NOTIFICATION_TYPES.NEW_TICKET,
          link: `/tickets/${ticket._id}`,
        },
        io,
      ),
    ),
  );

  return ticket;
};

// ==========================================
// Get Tickets (with filters, search, & pagination)
// ==========================================
export const getTickets = async (queryParams, user) => {
  const {
    page = 1,
    limit = 10,
    status,
    priority,
    category,
    assignedAgent,
    search,
    sort = "-createdAt",
    startDate,
    endDate,
  } = queryParams;

  const query = {
    deletedAt: null,
  };

  if (isCustomer(user)) {
    query.customer = user.id;
  } else if (isAgent(user)) {
    query.assignedAgent = user.id;
  } else if (!isAdmin(user)) {
    const error = new Error("Unauthorized");
    error.statusCode = 403;
    throw error;
  }

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  if (category) {
    query.category = category;
  }

  if (assignedAgent && user.role === "ADMIN") {
    query.assignedAgent = assignedAgent;
  }

  if (search) {
    query.$or = [
      {
        subject: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        ticketNumber: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      query.createdAt.$lte = new Date(endDate);
    }
  }

  const pageNumber = Math.max(Number(page) || 1, 1);
  const pageSize = Math.max(Number(limit) || 10, 1);
  const skip = (pageNumber - 1) * pageSize;

  const allowedSortFields = [
    "createdAt",
    "-createdAt",
    "updatedAt",
    "-updatedAt",
    "priority",
    "-priority",
    "status",
    "-status",
  ];

  const sortField = allowedSortFields.includes(sort) ? sort : "-createdAt";

  const tickets = await Ticket.find(query)
    .populate("customer", "name email")
    .populate("assignedAgent", "name email")
    .sort(sortField)
    .skip(skip)
    .limit(pageSize)
    .lean();

  const totalItems = await Ticket.countDocuments(query);
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    tickets,
    page: pageNumber,
    totalPages,
    totalItems,
  };
};

// ==========================================
// Get Ticket By ID
// ==========================================
export const getTicketById = async (ticketId, user) => {
  const ticket = await Ticket.findOne({
    _id: ticketId,
    deletedAt: null,
  })
    .populate("customer", "name email role")
    .populate("assignedAgent", "name email role");

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  // RBAC
  if (!canAccessTicket(user, ticket)) {
    const error = new Error("You are not authorised to access this ticket");
    error.statusCode = 403;
    throw error;
  }

  return ticket;
};

// ==========================================
// Update Ticket Details
// ==========================================
export const updateTicket = async (ticketId, payload, user) => {
  const ticket = await Ticket.findOne({
    _id: ticketId,
    deletedAt: null,
  });

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  // RBAC
  if (!canEditTicket(user, ticket)) {
    const error = new Error("You are not authorised to update this ticket");
    error.statusCode = 403;
    throw error;
  }

  if (payload.subject !== undefined) {
    ticket.subject = payload.subject;
  }

  if (payload.description !== undefined) {
    ticket.description = payload.description;
  }

  if (payload.category !== undefined) {
    ticket.category = payload.category;
  }

  if (payload.priority !== undefined) {
    if (!canChangePriority(user)) {
      const error = new Error(
        "You are not authorised to change ticket priority",
      );
      error.statusCode = 403;
      throw error;
    }

    const previousPriority = ticket.priority;
    ticket.priority = payload.priority;

    await createActivity({
      ticket: ticket._id,
      action: ACTIVITY_ACTION.PRIORITY_CHANGED,
      user: user.id,
      previousValue: previousPriority,
      newValue: payload.priority,
    });

    const io = getIO();

    await notificationService.createNotification(
      {
        user: ticket.customer,
        title: "Priority Updated",
        message: `${ticket.ticketNumber} priority changed to ${payload.priority}`,
        type: NOTIFICATION_TYPES.PRIORITY_CHANGED,
        link: `/tickets/${ticket._id}`,
      },
      io,
    );

    if (ticket.assignedAgent) {
      await notificationService.createNotification(
        {
          user: ticket.assignedAgent,
          title: "Priority Updated",
          message: `${ticket.ticketNumber} priority changed to ${payload.priority}`,
          type: NOTIFICATION_TYPES.PRIORITY_CHANGED,
          link: `/tickets/${ticket._id}`,
        },
        io,
      );
    }
  }

  if (payload.status) {
    if (!canChangeStatus(user, ticket)) {
      const error = new Error("You are not authorised to change ticket status");
      error.statusCode = 403;
      throw error;
    }

    const currentStatus = ticket.status;
    const nextStatus = payload.status;

    const isValidTransition = canTransitionStatus(currentStatus, nextStatus);

    if (!isValidTransition) {
      const error = new Error(
        `Invalid status transition from ${currentStatus} to ${nextStatus}`,
      );
      error.statusCode = 400;
      throw error;
    }

    const previousStatus = ticket.status;
    ticket.status = nextStatus;

    await createActivity({
      ticket: ticket._id,
      action: ACTIVITY_ACTION.STATUS_CHANGED,
      user: user.id,
      previousValue: previousStatus,
      newValue: nextStatus,
    });
    const io = getIO();

    await notificationService.createNotification(
      {
        user: ticket.customer,
        title: "Ticket Status Updated",
        message: `${ticket.ticketNumber} status changed to ${nextStatus}`,
        type: NOTIFICATION_TYPES.STATUS_CHANGED,
        link: `/tickets/${ticket._id}`,
      },
      io,
    );

    if (ticket.assignedAgent) {
      await notificationService.createNotification(
        {
          user: ticket.assignedAgent,
          title: "Ticket Status Updated",
          message: `${ticket.ticketNumber} status changed to ${nextStatus}`,
          type: NOTIFICATION_TYPES.STATUS_CHANGED,
          link: `/tickets/${ticket._id}`,
        },
        io,
      );
    }
  }

  if (payload.assignedAgent) {
    if (!canAssignTicket(user)) {
      const error = new Error("You are not authorised to assign tickets");
      error.statusCode = 403;
      throw error;
    }

    const agent = await User.findOne({
      _id: payload.assignedAgent,
      role: "AGENT",
    });

    if (!agent) {
      const error = new Error("Assigned agent not found");
      error.statusCode = 404;
      throw error;
    }

    ticket.assignedAgent = agent._id;

    await createActivity({
      ticket: ticket._id,
      action: ACTIVITY_ACTION.AGENT_ASSIGNED,
      user: user.id,
      previousValue: null,
      newValue: agent._id,
    });

    const io = getIO();

    await notificationService.createNotification(
      {
        user: agent._id,
        title: "Ticket Assigned",
        message: `Ticket ${ticket.ticketNumber} has been assigned to you.`,
        type: NOTIFICATION_TYPES.TICKET_ASSIGNED,
        link: `/tickets/${ticket._id}`,
      },
      io,
    );

    if (ticket.status === TICKET_STATUS.OPEN) {
      ticket.status = TICKET_STATUS.ASSIGNED;
    }
  }

  await ticket.save();

  return ticket;
};

// ==========================================
// Update Ticket Status
// ==========================================
export const updateTicketStatus = async (ticketId, status, user) => {
  const ticket = await Ticket.findOne({
    _id: ticketId,
    deletedAt: null,
  });

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  if (!canChangeStatus(user, ticket)) {
    const error = new Error("You are not authorised to change ticket status");
    error.statusCode = 403;
    throw error;
  }

  const isValidTransition = canTransitionStatus(ticket.status, status);

  if (!isValidTransition) {
    const error = new Error(
      `Invalid status transition from ${ticket.status} to ${status}`,
    );
    error.statusCode = 400;
    throw error;
  }

  const previousStatus = ticket.status;
  ticket.status = status;

  await ticket.save();

  await createActivity({
    ticket: ticket._id,
    action: ACTIVITY_ACTION.STATUS_CHANGED,
    user: user.id,
    previousValue: previousStatus,
    newValue: status,
  });

  const io = getIO();

  await notificationService.createNotification(
    {
      user: ticket.customer,
      title: "Ticket Status Updated",
      message: `${ticket.ticketNumber} is now ${status}`,
      type: NOTIFICATION_TYPES.STATUS_CHANGED,
      link: `/tickets/${ticket._id}`,
    },
    io,
  );

  if (ticket.assignedAgent) {
    await notificationService.createNotification(
      {
        user: ticket.assignedAgent,
        title: "Ticket Status Updated",
        message: `${ticket.ticketNumber} is now ${status}`,
        type: NOTIFICATION_TYPES.STATUS_CHANGED,
        link: `/tickets/${ticket._id}`,
      },
      io,
    );
  }

  return ticket;
};

// ==========================================
// Delete Ticket (Soft Delete)
// ==========================================
export const deleteTicket = async (ticketId, user) => {
  const ticket = await Ticket.findOne({
    _id: ticketId,
    deletedAt: null,
  });

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  if (!canDeleteTicket(user)) {
    const error = new Error("You are not authorised to delete this ticket");
    error.statusCode = 403;
    throw error;
  }

  // ==========================
  // RBAC
  // ==========================
  if (!canAccessTicket(user, ticket)) {
    const error = new Error("You are not authorised to access this ticket");
    error.statusCode = 403;
    throw error;
  }

  // ==========================
  // Soft Delete
  // ==========================
  ticket.deletedAt = new Date();
  ticket.deletedBy = user.id;

  await ticket.save();

  // ==========================
  // Activity Log
  // ==========================
  await createActivity({
    ticket: ticket._id,
    action: ACTIVITY_ACTION.TICKET_DELETED,
    user: user.id,
  });

  return ticket;
};

// ==========================================
// Get Ticket Activity History
// ==========================================
export const getTicketActivity = async (ticketId, user) => {
  await getTicketById(ticketId, user);

  return Activity.find({
    ticket: ticketId,
  })
    .populate("user", "name email role")
    .sort({ createdAt: -1 })
    .lean();
};

// ==========================================
// Assign Agent
// ==========================================
export const assignAgent = async (ticketId, agentId, user) => {
  const ticket = await Ticket.findOne({
    _id: ticketId,
    deletedAt: null,
  });

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  if (!canAssignTicket(user)) {
    const error = new Error("You are not authorised to assign tickets");
    error.statusCode = 403;
    throw error;
  }

  const agent = await User.findOne({
    _id: agentId,
    role: "AGENT",
  });

  if (!agent) {
    const error = new Error("Assigned agent not found");
    error.statusCode = 404;
    throw error;
  }

  const previousAgent = ticket.assignedAgent;
  ticket.assignedAgent = agent._id;

  if (ticket.status === TICKET_STATUS.OPEN) {
    ticket.status = TICKET_STATUS.ASSIGNED;
  }

  await ticket.save();

  await createActivity({
    ticket: ticket._id,
    action: ACTIVITY_ACTION.AGENT_ASSIGNED,
    user: user.id,
    previousValue: previousAgent,
    newValue: agent._id,
  });

  const io = getIO();

  await notificationService.createNotification(
    {
      user: agent._id,
      title: "Ticket Assigned",
      message: `You have been assigned ticket ${ticket.ticketNumber}`,
      type: NOTIFICATION_TYPES.TICKET_ASSIGNED,
      link: `/tickets/${ticket._id}`,
    },
    io,
  );

  return ticket;
};
