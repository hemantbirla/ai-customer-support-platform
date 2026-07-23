import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/auth/LoadingSpinner";

const RoleRoute = ({ allowedRoles }) => {
  const { initialized, isAuthenticated, user } = useAuth();

  if (!initialized) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
