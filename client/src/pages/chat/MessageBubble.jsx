import { Check, CheckCheck } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import usePresence from "../../hooks/usePresence";

import "./chat.css";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();
  const { isOnline } = usePresence();

  const mine = String(message.sender?._id) === String(user?._id);

  const online = isOnline(message.sender?._id);

  const renderStatus = () => {
    if (!mine) return null;

    if (message.readAt) {
      return (
        <span className="message-status read">
          <CheckCheck size={14} />
        </span>
      );
    }

    if (message.deliveredAt) {
      return (
        <span className="message-status delivered">
          <CheckCheck size={14} />
        </span>
      );
    }

    return (
      <span className="message-status sent">
        <Check size={14} />
      </span>
    );
  };

  return (
    <div className={`message-row ${mine ? "message-self" : "message-other"}`}>
      {!mine && (
        <div className="message-avatar-wrapper">
          <img
            src={
              message.sender?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                message.sender?.name || "User",
              )}`
            }
            className="message-avatar"
            alt={message.sender?.name}
          />

          <span className={`presence-dot ${online ? "online" : "offline"}`} />
        </div>
      )}

      <div className="message-bubble">
        <div className="message-author">{message.sender?.name}</div>

        <div className="message-text">{message.message}</div>

        <div className="message-footer">
          <span className="message-time">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
