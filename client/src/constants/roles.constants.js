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

export const ROLE_OPTIONS = Object.freeze([
  ROLES.CUSTOMER,
  ROLES.AGENT,
  ROLES.ADMIN,
]);

// ==========================================
// Role Labels (UI)
// ==========================================

export const ROLE_LABELS = Object.freeze({
  [ROLES.CUSTOMER]: "Customer",
  [ROLES.AGENT]: "Agent",
  [ROLES.ADMIN]: "Administrator",
});

// ==========================================
// Role Hierarchy
// Higher number = Higher privilege
// ==========================================

export const ROLE_HIERARCHY = Object.freeze({
  [ROLES.CUSTOMER]: 1,
  [ROLES.AGENT]: 2,
  [ROLES.ADMIN]: 3,
});
