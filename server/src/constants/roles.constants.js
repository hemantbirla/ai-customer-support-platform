// ==========================================
// User Roles
// ==========================================

export const ROLES = Object.freeze({
  CUSTOMER: "CUSTOMER",
  AGENT: "AGENT",
  ADMIN: "ADMIN",
});

// ==========================================
// Role Options
// ==========================================

export const ROLE_OPTIONS = Object.freeze(Object.values(ROLES));

// ==========================================
// Default Role
// ==========================================

export const DEFAULT_ROLE = ROLES.CUSTOMER;

// ==========================================
// Admin Roles
// ==========================================

export const ADMIN_ROLES = Object.freeze([ROLES.ADMIN]);

// ==========================================
// Support Roles
// ==========================================

export const SUPPORT_ROLES = Object.freeze([ROLES.AGENT, ROLES.ADMIN]);

// ==========================================
// All Roles
// ==========================================

export const ALL_ROLES = Object.freeze([
  ROLES.CUSTOMER,
  ROLES.AGENT,
  ROLES.ADMIN,
]);
