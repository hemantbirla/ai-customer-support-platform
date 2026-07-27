import PropTypes from "prop-types";
import styles from "./StatusBadge.module.css";

const STATUS_CLASS_MAP = {
  Open: styles.open,
  Assigned: styles.assigned,
  "In Progress": styles.inProgress,
  "Waiting for Customer": styles.waiting,
  Resolved: styles.resolved,
  Closed: styles.closed,
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`${styles.badge} ${
        STATUS_CLASS_MAP[status] || styles.default
      }`}
    >
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
