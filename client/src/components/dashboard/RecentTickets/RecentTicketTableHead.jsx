import React, { memo } from "react";

const RecentTicketTableHead = () => {
  return (
    <thead>
      <tr>
        <th>Ticket ID</th>

        <th>Subject</th>

        <th>Status</th>

        <th>Priority</th>

        <th>Created</th>

        <th>Action</th>
      </tr>
    </thead>
  );
};

export default memo(RecentTicketTableHead);
