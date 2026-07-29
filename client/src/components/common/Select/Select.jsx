import PropTypes from "prop-types";

import styles from "./Select.module.css";

const Select = ({
  label,
  name,
  value,
  options = [],
  placeholder = "Select",
  error,
  disabled = false,
  onChange,
  onBlur,
}) => {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label}>{label}</label>}

      <select
        name={name}
        value={value ?? ""}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.select} ${error ? styles.errorBorder : ""}`}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;

          const label = typeof option === "string" ? option : option.label;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

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
