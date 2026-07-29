import PropTypes from "prop-types";
import { Eye, Pencil, Trash2 } from "lucide-react";

import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../constants/roles";

import styles from "./TicketActions.module.css";

const TicketActions = ({ ticketId, onView, onEdit, onDelete }) => {
  const { user } = useAuth();

  const canEdit = user?.role === ROLES.AGENT || user?.role === ROLES.ADMIN;

  const canDelete = user?.role === ROLES.ADMIN;

  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.viewButton}
        onClick={() => onView(ticketId)}
      >
        <Eye size={16} />
        <span>View</span>
      </button>

      {canEdit && (
        <button
          type="button"
          className={styles.editButton}
          onClick={() => onEdit(ticketId)}
        >
          <Pencil size={16} />
          <span>Edit</span>
        </button>
      )}

      {canDelete && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(ticketId)}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      )}
    </div>
  );
};

TicketActions.propTypes = {
  ticketId: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TicketActions;
