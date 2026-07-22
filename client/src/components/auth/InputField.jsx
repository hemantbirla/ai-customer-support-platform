import React from "react";
import FormError from "./FormError";
import "../../styles/auth.css";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  name,
  error,
  autoComplete,
  disabled = false,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id || name} className="form-label">
          {label}
        </label>
      )}

      <input
        id={id || name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`form-input ${error ? "input-error" : ""}`}
        {...(register ? register(name) : {})}
      />

      <FormError message={error?.message} />
    </div>
  );
};

export default InputField;
