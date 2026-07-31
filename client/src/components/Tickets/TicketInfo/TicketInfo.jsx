import PropTypes from "prop-types";
import { format } from "date-fns";

import styles from "./TicketInfo.module.css";

const TicketInfo = ({ ticket }) => {
  if (!ticket) return null;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{ticket.ticketNumber}</h2>
          <span className={styles.date}>
            Created{" "}
            {ticket.createdAt
              ? format(new Date(ticket.createdAt), "dd MMM yyyy, hh:mm a")
              : "-"}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.field}>
          <label className={styles.label}>Subject</label>
          <p>{ticket.subject || "-"}</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <p className={styles.description}>{ticket.description || "-"}</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <span className={styles.badge}>{ticket.category || "-"}</span>
        </div>
      </div>
    </section>
  );
};

TicketInfo.propTypes = {
  ticket: PropTypes.object,
};

export default TicketInfo;
