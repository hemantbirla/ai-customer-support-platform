import { PERMISSIONS } from "../constants/permissions.constants.js";
import { ROLE_PERMISSIONS } from "../constants/permissions.constants.js";
import { ROLES } from "../constants/roles.constants.js";

// ==========================================
// Check if Role has Permission
// ==========================================

export const hasPermission = (role, permission) => {
  if (!role || !permission) {
    return false;
  }

  const permissions = ROLE_PERMISSIONS[role];

  if (!permissions) {
    return false;
  }

  return permissions.includes(permission);
};

// ==========================================
// Check if Admin
// ==========================================

export const isAdmin = (user) => {
  return user?.role === ROLES.ADMIN;
};

// ==========================================
// Check if Agent
// ==========================================

export const isAgent = (user) => {
  return user?.role === ROLES.AGENT;
};

// ==========================================
// Check if Customer
// ==========================================

export const isCustomer = (user) => {
  return user?.role === ROLES.CUSTOMER;
};

// ==========================================
// Customer owns ticket
// ==========================================

export const isTicketOwner = (user, ticket) => {
  if (!user || !ticket) return false;

  const ownerId = ticket.customer?._id || ticket.customer;

  const userId = user._id || user.id;

  return ownerId?.toString() === userId?.toString();
};

// ==========================================
// Agent assigned to ticket
// ==========================================

export const isAssignedAgent = (user, ticket) => {
  if (!user || !ticket) return false;

  const agentId = ticket.assignedAgent?._id || ticket.assignedAgent;

  const userId = user._id || user.id;

  return agentId?.toString() === userId?.toString();
};

// ==========================================
// Can Access Ticket
// ==========================================

export const canAccessTicket = (user, ticket) => {
  if (isAdmin(user)) {
    return true;
  }

  if (isAgent(user)) {
    return isAssignedAgent(user, ticket);
  }

  if (isCustomer(user)) {
    return isTicketOwner(user, ticket);
  }

  return false;
};

// ==========================================
// Can Edit Ticket
// ==========================================

export const canEditTicket = (user, ticket) => {
  if (isAdmin(user)) {
    return true;
  }

  if (isAgent(user)) {
    return isAssignedAgent(user, ticket);
  }

  return false;
};

// ==========================================
// Can Delete Ticket
// ==========================================

export const canDeleteTicket = (user) => {
  return isAdmin(user);
};

// ==========================================
// Can Assign Ticket
// ==========================================

export const canAssignTicket = (user) => {
  return isAdmin(user);
};

// ==========================================
// Can Change Priority
// ==========================================

export const canChangePriority = (user) => {
  return isAdmin(user);
};

// ==========================================
// Can Change Status
// ==========================================

export const canChangeStatus = (user, ticket) => {
  if (isAdmin(user)) {
    return true;
  }

  if (isAgent(user)) {
    return isAssignedAgent(user, ticket);
  }

  return false;
};

// ==========================================
// Can Add Internal Note
// ==========================================

export const canAddInternalNote = (user) => {
  return isAdmin(user) || isAgent(user);
};

// ==========================================
// Can View Activity Logs
// ==========================================

export const canViewActivityLogs = (user) => {
  return isAdmin(user) || isAgent(user);
};

// ==========================================
// Can Reopen Ticket
// ==========================================

export const canReopenTicket = (user) => {
  return isAdmin(user);
};
