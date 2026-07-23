import React from "react";
import logoImg from "../../assets/images/AISCP.png";

const Logo = ({
  title = "AI Support",
  subtitle = "Customer Support Platform",
}) => {
  return (
    <div className="auth-logo">
      <div className="auth-logo__icon">
        <img
          src={logoImg}
          alt={`${title} Logo`}
          className="w-12 h-12 object-contain"
        />
      </div>

      <div className="auth-logo__content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Logo;
