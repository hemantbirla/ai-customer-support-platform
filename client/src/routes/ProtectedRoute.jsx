import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Spinner from "../components/common/Spinner/Spinner";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { initialized, isAuthenticated } = useAuth();

  // Show spinner during initial token verification/refresh on page reloads
  if (!initialized) {
    return <Spinner />;
  }

  // Redirect to login only after initialization confirms user is unauthenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
