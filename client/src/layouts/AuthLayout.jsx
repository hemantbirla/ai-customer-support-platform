import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Logo from "../components/auth/Logo";

import "../styles/auth.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        {/* Left Section */}
        <div className="auth-layout__left">
          <div className="auth-layout__brand">
            <Logo />

            <h1>AI Customer Support Platform</h1>

            <p>
              Manage customer tickets efficiently with AI-powered summaries,
              smart reply suggestions, and real-time analytics.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="auth-layout__right">{children || <Outlet />}</div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthLayout;
