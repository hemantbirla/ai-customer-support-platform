import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import DashboardHome from "../pages/dashboard/DashboardHome";
// import Tickets from "../pages/tickets/Tickets";
// import Chat from "../pages/chat/Chat";
// import Analytics from "../pages/analytics/Analytics";
// import Profile from "../pages/profile/Profile";
// import Settings from "../pages/settings/Settings";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // Public Routes
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

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardHome />,
          },

          // Add these as build them

          // {
          //   path: "/tickets",
          //   element: <Tickets />,
          // },

          // {
          //   path: "/chat",
          //   element: <Chat />,
          // },

          // {
          //   path: "/analytics",
          //   element: <Analytics />,
          // },

          // {
          //   path: "/profile",
          //   element: <Profile />,
          // },

          // {
          //   path: "/settings",
          //   element: <Settings />,
          // },
        ],
      },
    ],
  },

  // Catch-all route
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default AppRoutes;
