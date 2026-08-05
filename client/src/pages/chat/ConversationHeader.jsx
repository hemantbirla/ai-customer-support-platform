import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getTicketById } from "../../services/ticket.service";

const ConversationHeader = ({ ticketId }) => {
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      const response = await getTicketById(ticketId);

      setTicket(response.data.data.ticket);
    } catch (err) {
      console.error(err);
    }
  };

  if (!ticket) return null;

  const customer = ticket.customer;

  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <button className="chat-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>

        <div className="chat-avatar">
          {customer?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="chat-user-info">
          <h3>{customer?.name}</h3>

          <p>{customer?.email}</p>
        </div>
      </div>

      <div className="chat-header-right">
        <div className="ticket-number">{ticket.ticketNumber}</div>

        <div className={`ticket-status status-${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </div>
      </div>
    </header>
  );
};

export default ConversationHeader;
