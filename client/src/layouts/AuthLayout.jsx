import { Outlet } from "react-router-dom";
import Logo from "../components/auth/Logo";
import "../styles/auth.css";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <Logo />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
