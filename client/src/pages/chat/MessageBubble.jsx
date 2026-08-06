import { Check, CheckCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import "./chat.css";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();

  const isMine = String(message.sender?._id) === String(user?._id);

  const renderReceipt = () => {
    if (!isMine) return null;

    if (message.readAt) {
      return <CheckCheck size={14} color="#0ea5e9" strokeWidth={2.5} />;
    }

    if (message.deliveredAt) {
      return <CheckCheck size={14} strokeWidth={2.5} />;
    }

    return <Check size={14} strokeWidth={2.5} />;
  };

  return (
    <div className={`message-row ${isMine ? "message-self" : "message-other"}`}>
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

          {renderReceipt()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
