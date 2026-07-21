import React from "react";
import "../../styles/auth.css";

const LoadingSpinner = ({ size = "sm" }) => {
  return (
    <span
      className={`loading-spinner loading-spinner-${size}`}
      aria-hidden="true"
    />
  );
};

export default LoadingSpinner;
