import {
  LayoutDashboard,
  Ticket,
  MessageSquare,
  User,
  Settings,
  Users,
  BarChart3,
  PlusCircle,
} from "lucide-react";

import { ROLES } from "../constants/roles.constants";

export const sidebarMenus = {
  // ==========================================
  // CUSTOMER
  // ==========================================
  [ROLES.CUSTOMER]: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "my-tickets",
      label: "My Tickets",
      path: "/tickets",
      icon: Ticket,
    },
    {
      id: "create-ticket",
      label: "Create Ticket",
      path: "/tickets/new",
      icon: PlusCircle,
    },
    {
      id: "chat",
      label: "AI Chat",
      path: "/chat",
      icon: MessageSquare,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ],

  // ==========================================
  // AGENT
  // ==========================================
  [ROLES.AGENT]: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "assigned-tickets",
      label: "Assigned Tickets",
      path: "/tickets",
      icon: Ticket,
    },
    {
      id: "customers",
      label: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      id: "chat",
      label: "AI Chat",
      path: "/chat",
      icon: MessageSquare,
    },
    {
      id: "analytics",
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: User,
    },
  ],

  // ==========================================
  // ADMIN
  // ==========================================
  [ROLES.ADMIN]: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      label: "Users",
      path: "/users",
      icon: Users,
    },
    {
      id: "agents",
      label: "Agents",
      path: "/agents",
      icon: Users,
    },
    {
      id: "tickets",
      label: "All Tickets",
      path: "/tickets",
      icon: Ticket,
    },
    {
      id: "analytics",
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ],
};
