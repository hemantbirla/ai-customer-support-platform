import PropTypes from "prop-types";
import { Eye, Pencil, Trash2, UserPlus, RotateCcw } from "lucide-react";

import PermissionGuard from "../../Common/PermissionGuard";
import useTicketPermissions from "../../../hooks/useTicketPermissions";

import styles from "./TicketActions.module.css";

const TicketActions = ({
  ticket,
  onView,
  onEdit,
  onDelete,
  onAssign,
  onReopen,
}) => {
  const { canEdit, canDelete, canAssign, canReopen } =
    useTicketPermissions(ticket);

  return (
    <div className={styles.actions}>
      {/* =========================
          View (Everyone)
      ========================== */}

      <button
        type="button"
        className={styles.viewButton}
        onClick={() => onView(ticket._id)}
      >
        <Eye size={16} />
        <span>View</span>
      </button>

      {/* =========================
          Edit (Admin)
      ========================== */}

      <PermissionGuard permission="canEditTicket">
        {canEdit && (
          <button
            type="button"
            className={styles.editButton}
            onClick={() => onEdit(ticket._id)}
          >
            <Pencil size={16} />
            <span>Edit</span>
          </button>
        )}
      </PermissionGuard>

      {/* =========================
          Assign Agent (Admin)
      ========================== */}

      <PermissionGuard permission="canAssignAgent">
        {canAssign && (
          <button
            type="button"
            className={styles.assignButton}
            onClick={() => onAssign(ticket)}
          >
            <UserPlus size={16} />
            <span>Assign</span>
          </button>
        )}
      </PermissionGuard>

      {/* =========================
          Reopen (Admin)
      ========================== */}

      <PermissionGuard permission="canReopenTicket">
        {canReopen && (
          <button
            type="button"
            className={styles.reopenButton}
            onClick={() => onReopen(ticket)}
          >
            <RotateCcw size={16} />
            <span>Reopen</span>
          </button>
        )}
      </PermissionGuard>

      {/* =========================
          Delete (Admin)
      ========================== */}

      <PermissionGuard permission="canDeleteTicket">
        {canDelete && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onDelete(ticket._id)}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        )}
      </PermissionGuard>
    </div>
  );
};

TicketActions.propTypes = {
  ticket: PropTypes.object.isRequired,

  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,

  onAssign: PropTypes.func,
  onReopen: PropTypes.func,
};

TicketActions.defaultProps = {
  onAssign: () => {},
  onReopen: () => {},
};

export default TicketActions;
