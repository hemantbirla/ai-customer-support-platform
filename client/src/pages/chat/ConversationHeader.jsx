import useAuth from "../../hooks/useAuth";
import usePresence from "../../hooks/usePresence";

import "./chat.css";

const ConversationHeader = ({ ticket }) => {
  const { user } = useAuth();
  const { isOnline } = usePresence();

  if (!ticket || !user) return null;

  let otherUser = null;

  switch (user.role) {
    case "CUSTOMER":
      otherUser = ticket.assignedAgent;
      break;

    case "AGENT":
      otherUser = ticket.customer;
      break;

    case "ADMIN":
      otherUser = ticket.assignedAgent || ticket.customer;
      break;

    default:
      otherUser = null;
  }

  const online = otherUser?._id ? isOnline(otherUser._id.toString()) : false;

  return (
    <header className="chat-header">
      <div className="chat-user">
        <div className="chat-avatar-wrapper">
          <img
            className="chat-avatar"
            src={
              otherUser?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                otherUser?.name || "Support",
              )}`
            }
            alt={otherUser?.name || "Support"}
          />

          <span className={`presence-dot ${online ? "online" : "offline"}`} />
        </div>

        <div className="chat-user-info">
          <h3>{otherUser?.name || "Support"}</h3>

          <p>{online ? "Online" : "Offline"}</p>
        </div>
      </div>

      <div className="chat-ticket">
        #{ticket.ticketNumber || ticket._id.slice(-6)}
      </div>
    </header>
  );
};

export default ConversationHeader;
