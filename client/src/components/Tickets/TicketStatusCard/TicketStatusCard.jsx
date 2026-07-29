import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { ROLES } from "../../../constants/roles";

import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
} from "../../../constants/ticket.constants";

import {
  updateTicketStatus,
  assignAgent,
} from "../../../services/ticket.service";

import styles from "./TicketStatusCard.module.css";

const TicketStatusCard = ({ ticket, role, onStatusChange }) => {
  if (!ticket) return null;

  const canEditStatus = role === ROLES.ADMIN || role === ROLES.AGENT;

  const handleStatusChange = async (event) => {
    try {
      await updateTicketStatus(ticket._id, event.target.value);

      toast.success("Status updated");

      refreshTicket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update status");
    }
  };

  const handleAssign = async (agentId) => {
    try {
      await assignAgent(ticket._id, agentId);

      toast.success("Agent assigned");

      refreshTicket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to assign agent");
    }
  };

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
