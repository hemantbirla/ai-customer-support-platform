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

import { ROLES } from "../constants/roles";

export const sidebarMenus = {
  [ROLES.CUSTOMER]: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "tickets",
      label: "My Tickets",
      path: "/tickets",
      icon: Ticket,
    },
    {
      id: "create-ticket",
      label: "Create Ticket",
      path: "/tickets/create",
      icon: PlusCircle,
    },
    {
      id: "chat",
      label: "Chat",
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
      label: "Chat",
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
      label: "Tickets",
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
