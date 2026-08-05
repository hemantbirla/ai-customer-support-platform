import { useAuth } from "../../hooks/useAuth";
import "./chat.css";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();

  const isMine = message.sender?._id === user?._id;

  return (
    <div className={`message-row ${isMine ? "message-self" : "message-other"}`}>
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
