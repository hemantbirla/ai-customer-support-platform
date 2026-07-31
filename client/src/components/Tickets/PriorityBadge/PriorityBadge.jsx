import PropTypes from "prop-types";
import styles from "./PriorityBadge.module.css";

const PRIORITY_CLASS_MAP = {
  Low: styles.low,
  Medium: styles.medium,
  High: styles.high,
  Urgent: styles.urgent,
};

const PriorityBadge = ({ priority }) => {
  return (
    <span
      className={`${styles.badge} ${
        PRIORITY_CLASS_MAP[priority] || styles.default
      }`}
    >
      {priority}
    </span>
  );
};

PriorityBadge.propTypes = {
  priority: PropTypes.string.isRequired,
};

export default PriorityBadge;
