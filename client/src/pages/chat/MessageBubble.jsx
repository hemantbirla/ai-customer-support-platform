import { useAuth } from "../../hooks/useAuth";
import usePresence from "../../hooks/usePresence";

import "./chat.css";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();
  const { isOnline } = usePresence();

  const mine = message.sender?._id === user?._id;

  const online = isOnline(message.sender?._id);

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

        <div className="message-time">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
