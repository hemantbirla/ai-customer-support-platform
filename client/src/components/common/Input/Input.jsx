import React, { forwardRef, useId, useMemo, useState } from "react";
import { FiAlertCircle, FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import FormError from "../FormError/FormError";
import "./Input.css";

const Input = forwardRef(
  (
    {
      // Basic
      id,
      name,
      label,
      type = "text",
      placeholder = "",

      // React Hook Form
      register,

      // Controlled Input
      value,
      defaultValue,
      onChange,
      onBlur,

      // Validation & Tooltip
      error,
      helperText,
      infoTooltip, // 👈 New prop for info icon tooltip text
      required = false,

      // Icons
      leftIcon,
      rightIcon,

      // Appearance
      variant = "outlined",
      size = "md",
      fullWidth = true,

      // States
      disabled = false,
      readOnly = false,

      // Password
      showPasswordToggle = true,

      // Styling
      className = "",
      containerClassName = "",
      inputClassName = "",

      // Other
      autoComplete,
      autoFocus = false,
      maxLength,
      minLength,
      max,
      min,
      step,
      rows = 4,

      // Textarea
      multiline = false,

      // Rest
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const [showPassword, setShowPassword] = useState(false);

    const inputType = useMemo(() => {
      if (type !== "password") return type;
      return showPassword ? "text" : "password";
    }, [type, showPassword]);

    const registration = register && name ? register(name) : {};

    const containerClasses = [
      "input",
      fullWidth ? "input--full-width" : "",
      `input--${size}`,
      `input--${variant}`,
      leftIcon ? "input--has-prefix" : "",
      rightIcon || (type === "password" && showPasswordToggle)
        ? "input--has-suffix"
        : "",
      disabled ? "input--disabled" : "",
      error ? "input--error" : "",
      containerClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const commonProps = {
      id: inputId,
      name,
      placeholder,
      autoComplete,
      autoFocus,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      onBlur,
      maxLength,
      minLength,
      max,
      min,
      step,
      "aria-invalid": !!error,
      "aria-describedby": [helperText ? helperId : "", error ? errorId : ""]
        .filter(Boolean)
        .join(" "),
      className: `input__field ${inputClassName}`,
      ref,
      ...registration,
      ...rest,
    };

    return (
      <div className={containerClasses}>
        {label && (
          <div className="input__label-wrapper">
            <label htmlFor={inputId} className="input__label">
              {label}
              {required && <span className="input__required">*</span>}
            </label>

            {/* Info Icon with Tooltip */}
            {infoTooltip && (
              <div className="input__tooltip-container">
                <FiInfo className="input__info-icon" />
                <div className="input__tooltip-content">{infoTooltip}</div>
              </div>
            )}
          </div>
        )}

        <div className={`input__wrapper ${className}`}>
          {leftIcon && <span className="input__prefix">{leftIcon}</span>}

          {multiline ? (
            <textarea rows={rows} {...commonProps} />
          ) : (
            <input type={inputType} {...commonProps} />
          )}

          {type === "password" && showPasswordToggle && (
            <button
              type="button"
              tabIndex={-1}
              className="input__toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          )}

          {type !== "password" && rightIcon && (
            <span className="input__suffix">{rightIcon}</span>
          )}
        </div>

        {helperText && !error && (
          <p id={helperId} className="input__helper">
            {helperText}
          </p>
        )}

        {error ? (
          <div id={errorId} className="input__error">
            <FiAlertCircle style={{ marginRight: "4px" }} />
            <FormError
              message={typeof error === "string" ? error : error?.message}
            />
          </div>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default React.memo(Input);
