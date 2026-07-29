import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTickets } from "../../../services/ticket.service";

import RecentTicketTableHead from "./RecentTicketTableHead";
import RecentTicketTableBody from "./RecentTicketTableBody";

import "./RecentTickets.css";

const RecentTickets = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);
  const [loading, setLoading] = useState(false);

  const loadTickets = async () => {
    try {
      setLoading(true);

      const response = await getTickets({
        page: 1,
        limit: 5,
      });

      setTickets(response.data.data.tickets || []);
    } catch (error) {
      console.error(error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <section className="recent-tickets">
      <h2 className="recent-tickets__title">Recent Tickets</h2>

      <div className="recent-tickets__table-wrapper">
        <table className="recent-tickets__table">
          <RecentTicketTableHead />

          <RecentTicketTableBody tickets={tickets} onView={handleViewTicket} />
        </table>
      </div>
    </section>
  );
};

export default memo(RecentTickets);
