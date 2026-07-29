import PropTypes from "prop-types";

import { ROLES } from "../../../constants/roles";

import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
} from "../../../constants/ticket.constants";

import styles from "./TicketStatusCard.module.css";

const TicketStatusCard = ({ ticket, role, onStatusChange }) => {
  if (!ticket) return null;

  const canEditStatus = role === ROLES.ADMIN || role === ROLES.AGENT;

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>Ticket Status</h3>

      {/* Status */}

      <div className={styles.field}>
        <label>Status</label>

        {canEditStatus ? (
          <select
            value={ticket.status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        ) : (
          <span className={styles.badge}>{ticket.status}</span>
        )}
      </div>

      {/* Priority */}

      <div className={styles.field}>
        <label>Priority</label>

        <span
          className={`${styles.badge} ${styles[ticket.priority?.toLowerCase()]}`}
        >
          {ticket.priority}
        </span>
      </div>

      {/* Assigned Agent */}

      <div className={styles.field}>
        <label>Assigned Agent</label>

        <p>{ticket.assignedAgent?.name || "Unassigned"}</p>
      </div>
    </section>
  );
};

TicketStatusCard.propTypes = {
  ticket: PropTypes.object,
  role: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default TicketStatusCard;
