import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/common/Spinner/Spinner";

const PublicRoute = () => {
  const { initialized, isAuthenticated } = useAuth();

  if (!initialized) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
