import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Lazy Loaded Pages
import {
  DashboardHome,
  Analytics,
  Chat,
  Profile,
  Settings,
} from "./lazyRoutes";

// Ticket Pages
import TicketList from "../pages/Tickets/TicketList";
import CreateTicket from "../pages/Tickets/CreateTicket";
import TicketDetails from "../pages/Tickets/TicketDetails";
import EditTicket from "../pages/Tickets/EditTicket";

// Route Guards
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../constants/roles.constants";

// Roles

const AppRoutes = createBrowserRouter([
  // ==================================================
  // Root
  // ==================================================
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // ==================================================
  // Public Routes
  // ==================================================
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/reset-password",
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },

  // ==================================================
  // Protected Routes
  // ==================================================
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // ==========================================
          // Dashboard
          // ==========================================

          {
            path: "/dashboard",
            element: <DashboardHome />,
          },

          // ==========================================
          // Tickets
          // Customer | Agent | Admin
          // ==========================================

          {
            element: (
              <ProtectedRoute
                allowedRoles={[ROLES.CUSTOMER, ROLES.AGENT, ROLES.ADMIN]}
              />
            ),
            children: [
              {
                path: "/tickets",
                element: <TicketList />,
              },
              {
                path: "/tickets/:ticketId",
                element: <TicketDetails />,
              },
            ],
          },

          // ==========================================
          // Create Ticket
          // Customer | Admin
          // ==========================================

          {
            element: (
              <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]} />
            ),
            children: [
              {
                path: "/tickets/new",
                element: <CreateTicket />,
              },
            ],
          },

          // ==========================================
          // Edit Ticket
          // Agent | Admin
          // ==========================================

          {
            element: (
              <ProtectedRoute allowedRoles={[ROLES.AGENT, ROLES.ADMIN]} />
            ),
            children: [
              {
                path: "/tickets/:ticketId/edit",
                element: <EditTicket />,
              },
            ],
          },

          // ==========================================
          // Chat
          // ==========================================

          {
            path: "/chat",
            element: <Chat />,
          },

          // ==========================================
          // Profile
          // ==========================================

          {
            path: "/profile",
            element: <Profile />,
          },

          // ==========================================
          // Settings
          // ==========================================

          {
            path: "/settings",
            element: <Settings />,
          },

          // ==========================================
          // Analytics
          // Admin Only
          // ==========================================

          {
            element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [
              {
                path: "/analytics",
                element: <Analytics />,
              },
            ],
          },
        ],
      },
    ],
  },

  // ==================================================
  // Catch All
  // ==================================================
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default AppRoutes;
