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
      `}
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
