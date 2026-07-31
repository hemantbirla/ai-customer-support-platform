import PropTypes from "prop-types";
import { forwardRef } from "react";

import styles from "./Select.module.css";

const Select = forwardRef(
  (
    {
      label,
      name,
      value,
      options = [],
      placeholder = "Select",
      error,
      disabled = false,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    return (
      <div className={styles.group}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}

        <select
          id={name}
          ref={ref}
          name={name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`${styles.select} ${error ? styles.errorBorder : ""}`}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => {
            const optionValue =
              typeof option === "string" ? option : option.value;

            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Select;
