import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiInfo } from "react-icons/fi";
import FormError from "../common/FormError/FormError";
import "../../styles/auth.css";

const PasswordInput = ({
  id,
  label,
  name,
  placeholder,
  register,
  error,
  autoComplete = "new-password",
  disabled = false,
  showRequirementsHint = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="form-group">
      <div
        className="form-label-wrapper"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {label && (
          <label htmlFor={id || name} className="form-label">
            {label}
          </label>
        )}

        {showRequirementsHint && (
          <div
            className="password-info-container"
            style={{ position: "relative" }}
          >
            <button
              type="button"
              className="password-info-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowTooltip(!showTooltip);
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label="Password rules"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6b7280",
                padding: "0 4px",
              }}
            >
              <FiInfo size={16} />
            </button>

            {showTooltip && (
              <div
                className="password-requirements-tooltip"
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: "120%",
                  width: "220px",
                  padding: "10px 12px",
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 10,
                }}
              >
                <strong>Password Rules:</strong>
                <ul
                  style={{
                    paddingLeft: "16px",
                    marginTop: "4px",
                    marginBottom: 0,
                  }}
                >
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One number</li>
                  <li>One special character (@$!%*?&)</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>
        <FiLock className="input-icon" />

        <input
          id={id || name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className="form-input"
          {...(register ? register(name) : {})}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={togglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <FormError message={error?.message} />
    </div>
  );
};

export default PasswordInput;
