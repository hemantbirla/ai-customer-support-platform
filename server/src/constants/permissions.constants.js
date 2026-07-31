import { ROLES } from "./roles.constants.js";

// ==========================================
// Permission Constants
// ==========================================

export const PERMISSIONS = Object.freeze({
  // Tickets
  CREATE_TICKET: "CREATE_TICKET",
  VIEW_TICKET: "VIEW_TICKET",
  VIEW_ALL_TICKETS: "VIEW_ALL_TICKETS",
  EDIT_TICKET: "EDIT_TICKET",
  DELETE_TICKET: "DELETE_TICKET",

  // Workflow
  CHANGE_STATUS: "CHANGE_STATUS",
  CHANGE_PRIORITY: "CHANGE_PRIORITY",
  ASSIGN_AGENT: "ASSIGN_AGENT",
  REOPEN_TICKET: "REOPEN_TICKET",

  // Communication
  ADD_COMMENT: "ADD_COMMENT",
  ADD_INTERNAL_NOTE: "ADD_INTERNAL_NOTE",

  // Attachments
  UPLOAD_ATTACHMENT: "UPLOAD_ATTACHMENT",

  // Activity
  VIEW_ACTIVITY: "VIEW_ACTIVITY",

  // User Management
  MANAGE_USERS: "MANAGE_USERS",
});

// ==========================================
// Role Permission Mapping
// ==========================================

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.CUSTOMER]: [
    PERMISSIONS.CREATE_TICKET,
    PERMISSIONS.VIEW_TICKET,
    PERMISSIONS.ADD_COMMENT,
    PERMISSIONS.UPLOAD_ATTACHMENT,
  ],

  [ROLES.AGENT]: [
    PERMISSIONS.VIEW_TICKET,
    PERMISSIONS.VIEW_ALL_TICKETS,
    PERMISSIONS.EDIT_TICKET,
    PERMISSIONS.CHANGE_STATUS,
    PERMISSIONS.ADD_COMMENT,
    PERMISSIONS.ADD_INTERNAL_NOTE,
    PERMISSIONS.UPLOAD_ATTACHMENT,
    PERMISSIONS.VIEW_ACTIVITY,
  ],

  [ROLES.ADMIN]: Object.values(PERMISSIONS),
});
