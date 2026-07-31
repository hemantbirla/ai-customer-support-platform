import React, { memo } from "react";
import PropTypes from "prop-types";

import Badge from "../../common/Badge/Badge";

const RecentTicketRow = ({ ticket, onView }) => {
  return (
    <tr>
      <td>{ticket.ticketNumber}</td>

      <td>{ticket.subject}</td>

      <td>
        <Badge type={ticket.status.toLowerCase()}>{ticket.status}</Badge>
      </td>

      <td>
        <Badge type={ticket.priority.toLowerCase()}>{ticket.priority}</Badge>
      </td>

      <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>

      <td>
        <button
          type="button"
          className="view-ticket-btn"
          onClick={() => onView(ticket._id)}
        >
          View
        </button>
      </td>
    </tr>
  );
};

RecentTicketRow.propTypes = {
  ticket: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
};

export default memo(RecentTicketRow);
