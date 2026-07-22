import React from "react";
import "../../styles/auth.css";

const FormError = ({ message, error }) => {
  const errorMessage = message || error;

  if (!errorMessage) return null;

  return (
    <p className="form-error" role="alert">
      {errorMessage}
    </p>
  );
};

export default FormError;
