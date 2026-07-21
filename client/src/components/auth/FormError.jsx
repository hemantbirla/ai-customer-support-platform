import React from "react";
import "../../styles/auth.css";

const FormError = ({ error }) => {
  if (!error) return null;

  return (
    <p className="form-error" role="alert">
      {error}
    </p>
  );
};

export default FormError;
