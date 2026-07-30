// ==========================================
// Ticket Status (API Enums)
// ==========================================

import { ROLES } from "./roles.constants";

export const TICKET_STATUS = Object.freeze({
  OPEN: "OPEN",
  ASSIGNED: "ASSIGNED",
  IN_PROGRESS: "IN_PROGRESS",
  WAITING_CUSTOMER: "WAITING_CUSTOMER",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
  REOPENED: "REOPENED",
});

// ==========================================
// Ticket Priority (API Enums)
// ==========================================

export const TICKET_PRIORITY = Object.freeze({
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
});

// ==========================================
// Ticket Category (API Enums)
// ==========================================

export const TICKET_CATEGORY = Object.freeze({
  BILLING: "BILLING",
  TECHNICAL: "TECHNICAL",
  ACCOUNT: "ACCOUNT",
  GENERAL: "GENERAL",
  FEATURE_REQUEST: "FEATURE_REQUEST",
});

// ==========================================
// Activity Actions
// ==========================================

export const ACTIVITY_ACTION = Object.freeze({
  CREATED: "CREATED",
  UPDATED: "UPDATED",
  STATUS_CHANGED: "STATUS_CHANGED",
  PRIORITY_CHANGED: "PRIORITY_CHANGED",
  ASSIGNED: "ASSIGNED",
  COMMENT_ADDED: "COMMENT_ADDED",
  ATTACHMENT_ADDED: "ATTACHMENT_ADDED",
  CLOSED: "CLOSED",
  REOPENED: "REOPENED",
});

// ==========================================
// Labels (UI)
// ==========================================

export const STATUS_LABELS = Object.freeze({
  OPEN: "Open",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  WAITING_CUSTOMER: "Waiting for Customer",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
  REOPENED: "Reopened",
});

export const PRIORITY_LABELS = Object.freeze({
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
});

export const CATEGORY_LABELS = Object.freeze({
  BILLING: "Billing",
  TECHNICAL: "Technical",
  ACCOUNT: "Account",
  GENERAL: "General",
  FEATURE_REQUEST: "Feature Request",
});

// ==========================================
// Dropdown Options
// ==========================================

export const STATUS_OPTIONS = Object.values(TICKET_STATUS);

export const PRIORITY_OPTIONS = Object.values(TICKET_PRIORITY);

export const CATEGORY_OPTIONS = Object.values(TICKET_CATEGORY);

// ==========================================
// Ticket Sorting
// ==========================================

export const TICKET_SORT = Object.freeze({
  NEWEST: "-createdAt",
  OLDEST: "createdAt",
  LAST_UPDATED: "-updatedAt",
  PRIORITY: "priority",
  STATUS: "status",
});

// ==========================================
// Status Workflow
// ==========================================

export const STATUS_TRANSITIONS = Object.freeze({
  OPEN: ["ASSIGNED"],

  ASSIGNED: ["IN_PROGRESS"],

  IN_PROGRESS: ["WAITING_CUSTOMER", "RESOLVED"],

  WAITING_CUSTOMER: ["IN_PROGRESS", "RESOLVED"],

  RESOLVED: ["CLOSED", "REOPENED"],

  REOPENED: ["ASSIGNED"],

  CLOSED: [],
});

// ==========================================
// Ticket Table Columns
// ==========================================

export const TICKET_TABLE_COLUMNS = [
  {
    key: "ticketNumber",
    label: "Ticket ID",
  },
  {
    key: "subject",
    label: "Subject",
  },
  {
    key: "customer",
    label: "Customer",
  },
  {
    key: "assignedAgent",
    label: "Assigned Agent",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "priority",
    label: "Priority",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "createdAt",
    label: "Created",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

// ==========================================
// Default Filters
// ==========================================

export const DEFAULT_TICKET_FILTERS = {
  search: "",
  status: "",
  priority: "",
  category: "",
  assignedAgent: "",
  page: 1,
  limit: 10,
  sort: TICKET_SORT.NEWEST,
};

// ==========================================
// Role Permissions
// ==========================================

export const TICKET_PERMISSIONS = Object.freeze({
  [ROLES.CUSTOMER]: {
    canCreate: true,
    canEdit: false,
    canDelete: false,
    canAssign: false,
  },

  [ROLES.AGENT]: {
    canCreate: false,
    canEdit: true,
    canDelete: false,
    canAssign: false,
  },

  [ROLES.ADMIN]: {
    canCreate: false,
    canEdit: true,
    canDelete: true,
    canAssign: true,
  },
});
