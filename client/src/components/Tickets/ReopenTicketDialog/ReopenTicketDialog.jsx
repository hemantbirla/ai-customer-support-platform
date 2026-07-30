import PropTypes from "prop-types";

import styles from "./ReopenTicketDialog.module.css";

const ReopenTicketDialog = ({ open, loading = false, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>Reopen Ticket</h2>

        <p>
          This ticket is currently closed.
          <br />
          Reopening it will change its status to <strong>In Progress</strong>.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.confirm}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Reopening..." : "Reopen Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
};

ReopenTicketDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ReopenTicketDialog;
