import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Spinner from "../components/common/Spinner/Spinner";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { initialized, isAuthenticated, user } = useAuth();

  // Wait until auth initialization completes
  if (!initialized) {
    return <Spinner />;
  }

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role authorization
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
