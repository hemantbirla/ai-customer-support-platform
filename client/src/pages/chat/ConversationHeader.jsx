import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTicketById } from "../../services/ticket.service";

const ConversationHeader = ({ ticketId }) => {
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      setLoading(true);

      const response = await getTicketById(ticketId);

      setTicket(response.data.ticket);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chat-header">
        <div className="chat-header-loading">Loading...</div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <button className="chat-back-btn" onClick={() => navigate(-1)}>
          ←
        </button>

        <div className="chat-avatar">
          {ticket.customer?.name?.charAt(0)?.toUpperCase()}
        </div>

        <div className="chat-user-info">
          <h3>{ticket.customer?.name}</h3>

          <span>{ticket.customer?.email}</span>
        </div>
      </div>

      <div className="chat-header-right">
        <span className="ticket-number">#{ticket.ticketNumber}</span>

        <span className={`ticket-status status-${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </span>
      </div>
    </header>
  );
};

export default ConversationHeader;
