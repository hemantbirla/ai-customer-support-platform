import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import FormError from "./FormError";

import "../../styles/auth.css";

const PasswordInput = ({
  label,
  name,
  placeholder,
  register,
  error,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>
        <FiLock className="input-icon" />

        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="current-password"
          disabled={disabled}
          {...register(name)}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={togglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <FormError message={error?.message} />
    </div>
  );
};

export default PasswordInput;
