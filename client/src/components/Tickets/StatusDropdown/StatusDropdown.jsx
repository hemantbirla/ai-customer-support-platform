import PropTypes from "prop-types";
import { useState } from "react";

import styles from "./StatusDropdown.module.css";

const StatusDropdown = ({
  currentStatus,
  options = [],
  disabled = false,
  loading = false,
  onChange,
}) => {
  const [value, setValue] = useState(currentStatus);

  const handleChange = (event) => {
    const newStatus = event.target.value;

    setValue(newStatus);

    if (newStatus !== currentStatus) {
      onChange(newStatus);
    }
  };

  return (
    <select
      className={styles.select}
      value={value}
      onChange={handleChange}
      disabled={disabled || loading}
    >
      <option value={currentStatus}>
        {currentStatus.replaceAll("_", " ")}
      </option>

      {options.map((status) => (
        <option key={status} value={status}>
          {status.replaceAll("_", " ")}
        </option>
      ))}
    </select>
  );
};

StatusDropdown.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default StatusDropdown;
