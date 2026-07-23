import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import LoadingSpinner from "../components/auth/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { initialized, isAuthenticated } = useAuth();

  if (!initialized) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
