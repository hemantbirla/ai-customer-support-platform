import { useMemo } from "react";

import useAuth from "./useAuth";
import {
  STATUS_TRANSITIONS,
  TICKET_STATUS,
} from "../constants/ticket.constants";
import { ROLES } from "../constants/roles.constants";

const useTicketPermissions = (ticket) => {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user || !ticket) {
      return {
        isOwner: false,
        isAssignedAgent: false,

        canView: false,
        canReply: false,
        canEdit: false,
        canDelete: false,
        canAssign: false,
        canChangeStatus: false,
        canChangePriority: false,
        canViewLogs: false,
        canAddInternalNote: false,
        canReopen: false,

        allowedTransitions: [],
      };
    }

    const role = user.role;

    const isAdmin = role === ROLES.ADMIN;

    const isAgent = role === ROLES.AGENT;

    const isCustomer = role === ROLES.CUSTOMER;

    const isOwner =
      ticket.customer?._id === user._id || ticket.customer === user._id;

    const isAssignedAgent =
      ticket.assignedAgent?._id === user._id ||
      ticket.assignedAgent === user._id;

    // ===========================
    // View Permission
    // ===========================

    const canView = isAdmin || isAssignedAgent || (isCustomer && isOwner);

    // ===========================
    // Reply Permission
    // ===========================

    const canReply = isAdmin || isAssignedAgent || (isCustomer && isOwner);

    // ===========================
    // Edit Permission
    // ===========================

    const canEdit = isAdmin || isAssignedAgent;

    // ===========================
    // Delete
    // ===========================

    const canDelete = isAdmin;

    // ===========================
    // Assign Agent
    // ===========================

    const canAssign = isAdmin;

    // ===========================
    // Change Status
    // ===========================

    const canChangeStatus = isAdmin || isAssignedAgent;

    // ===========================
    // Change Priority
    // ===========================

    const canChangePriority = isAdmin;

    // ===========================
    // Activity Logs
    // ===========================

    const canViewLogs = isAdmin || isAssignedAgent;

    // ===========================
    // Internal Notes
    // ===========================

    const canAddInternalNote = isAdmin || isAssignedAgent;

    // ===========================
    // Reopen Ticket
    // ===========================

    const canReopen = isAdmin && ticket.status === TICKET_STATUS.CLOSED;

    // ===========================
    // Allowed Status Changes
    // ===========================

    const allowedTransitions = STATUS_TRANSITIONS[ticket.status] || [];

    return {
      isOwner,
      isAssignedAgent,

      canView,
      canReply,
      canEdit,
      canDelete,
      canAssign,
      canChangeStatus,
      canChangePriority,
      canViewLogs,
      canAddInternalNote,
      canReopen,

      allowedTransitions,
    };
  }, [user, ticket]);
};

export default useTicketPermissions;
