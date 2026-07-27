import PropTypes from "prop-types";
import { format } from "date-fns";

import TicketActions from "../TicketActions";
import StatusBadge from "../StatusBadge/StatusBadge";
import PriorityBadge from "../PriorityBadge/PriorityBadge";

import styles from "./TicketRow.module.css";

const TicketRows = ({ tickets, role, onView, onEdit, onDelete }) => {
  return (
    <>
      {tickets.map((ticket) => (
        <tr key={ticket._id}>
          <td>{ticket.ticketNumber}</td>

          <td className={styles.subject}>{ticket.subject}</td>

          <td>{ticket.customer?.name || "-"}</td>

          <td>{ticket.assignedAgent?.name || "-"}</td>

          <td>{ticket.category}</td>

          <td>
            <PriorityBadge priority={ticket.priority} />
          </td>

          <td>
            <StatusBadge status={ticket.status} />
          </td>

          <td>{format(new Date(ticket.createdAt), "dd MMM yyyy")}</td>

          <td>
            <TicketActions
              ticketId={ticket._id}
              role={role}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </td>
        </tr>
      ))}
    </>
  );
};

TicketRows.propTypes = {
  tickets: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TicketRows;
