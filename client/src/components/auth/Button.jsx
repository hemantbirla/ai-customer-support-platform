import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import "../../styles/auth.css";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        auth-button
        auth-button-${variant}
        ${fullWidth ? "full-width" : ""}
        ${className}
      `.trim()}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
