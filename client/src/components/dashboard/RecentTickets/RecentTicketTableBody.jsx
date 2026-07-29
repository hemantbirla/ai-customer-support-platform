import React, { memo } from "react";
import PropTypes from "prop-types";

import RecentTicketRow from "./RecentTicketRow";

const RecentTicketTableBody = ({ tickets, onView }) => {
  return (
    <tbody>
      {tickets.map((ticket) => (
        <RecentTicketRow key={ticket._id} ticket={ticket} onView={onView} />
      ))}
    </tbody>
  );
};

RecentTicketTableBody.propTypes = {
  tickets: PropTypes.array.isRequired,
  onView: PropTypes.func.isRequired,
};

export default memo(RecentTicketTableBody);
