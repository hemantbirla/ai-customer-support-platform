import PropTypes from "prop-types";

import TicketRows from "../TicketRow/TicketRow";
import { TICKET_TABLE_COLUMNS } from "../../../constants/ticket.constants";

import styles from "./TicketTable.module.css";

const TicketTable = ({ tickets, role, onView, onEdit, onDelete }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {TICKET_TABLE_COLUMNS.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <TicketRows
            tickets={tickets}
            role={role}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </tbody>
      </table>
    </div>
  );
};

TicketTable.propTypes = {
  tickets: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TicketTable;
