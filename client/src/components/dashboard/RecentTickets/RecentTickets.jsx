import React, { memo } from "react";

import { recentTickets } from "../../../data/dashboardData";

import RecentTicketTableHead from "./RecentTicketTableHead";
import RecentTicketTableBody from "./RecentTicketTableBody";

import "./RecentTickets.css";

const RecentTickets = () => {
  const handleViewTicket = (ticketId) => {
    console.log("View Ticket:", ticketId);

    // Later
    // navigate(`/tickets/${ticketId}`);
  };

  return (
    <section className="recent-tickets">
      <h2 className="recent-tickets__title">Recent Tickets</h2>

      <div className="recent-tickets__table-wrapper">
        <table className="recent-tickets__table">
          <RecentTicketTableHead />

          <RecentTicketTableBody
            tickets={recentTickets}
            onView={handleViewTicket}
          />
        </table>
      </div>
    </section>
  );
};

export default memo(RecentTickets);
