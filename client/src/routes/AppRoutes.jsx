import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import {
  DashboardHome,
  Tickets,
  Analytics,
  Chat,
  Profile,
  Settings,
} from "./lazyRoutes";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // ==========================
  // Public Routes
  // ==========================
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

  // ==========================
  // Protected Routes
  // ==========================
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
          {
            path: "/tickets",
            element: <Tickets />,
          },
          {
            path: "/chat",
            element: <Chat />,
          },
          {
            path: "/analytics",
            element: <Analytics />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },

  // ==========================
  // Catch All
  // ==========================
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default AppRoutes;
