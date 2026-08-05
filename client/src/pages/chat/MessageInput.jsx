import { useRef, useState } from "react";
import { Send } from "lucide-react";

import { socket } from "../../socket/socket";

import "./chat.css";

const MessageInput = ({ onSend, sending, ticketId }) => {
  const [message, setMessage] = useState("");
  const typingTimeout = useRef(null);

  const handleSubmit = async () => {
    const value = message.trim();

    if (!value || sending) {
      return;
    }
    await onSend(value);
    setMessage("");

    socket.emit("typing:stop", {
      ticketId,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSubmit();
    }
  };

  const emitTyping = () => {
    socket.emit("typing:start", {
      ticketId,
    });

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("typing:stop", {
        ticketId,
      });
    }, 1000);
  };

  return (
    <div className="message-input">
      <textarea
        value={message}
        placeholder="Type your message..."
        onChange={(event) => {
          setMessage(event.target.value);
          emitTyping();
        }}
        onKeyDown={handleKeyDown}
        disabled={sending}
        maxLength={5000}
        rows={2}
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={sending || !message.trim()}
        className="message-send-btn"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default MessageInput;
