import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Spinner from "../components/Common/Spinner/Spinner";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();

  const { initialized, isAuthenticated, user } = useAuth();

  // ==========================================
  // Wait until auth initialization completes
  // ==========================================

  if (!initialized) {
    return <Spinner />;
  }

  // ==========================================
  // Authentication
  // ==========================================

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ==========================================
  // Authorization
  // ==========================================

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // ==========================================
  // Authorized
  // ==========================================

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
