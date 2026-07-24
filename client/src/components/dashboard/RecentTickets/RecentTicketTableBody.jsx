import React, { memo } from "react";

import RecentTicketRow from "./RecentTicketRow";

const RecentTicketTableBody = ({ tickets, onView }) => {
  return (
    <tbody>
      {tickets.map((ticket) => (
        <RecentTicketRow key={ticket.id} ticket={ticket} onView={onView} />
      ))}
    </tbody>
  );
};

export default memo(RecentTicketTableBody);
