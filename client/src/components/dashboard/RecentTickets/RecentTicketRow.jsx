import React, { memo } from "react";

import Badge from "../../common/Badge/Badge";

const RecentTicketRow = ({ ticket, onView }) => {
  return (
    <tr>
      <td>{ticket.id}</td>

      <td>{ticket.subject}</td>

      <td>
        <Badge type={ticket.status.toLowerCase()}>{ticket.status}</Badge>
      </td>

      <td>
        <Badge type={ticket.priority.toLowerCase()}>{ticket.priority}</Badge>
      </td>

      <td>{ticket.createdAt}</td>

      <td>
        <button
          type="button"
          className="view-ticket-btn"
          onClick={() => onView(ticket.id)}
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default memo(RecentTicketRow);
