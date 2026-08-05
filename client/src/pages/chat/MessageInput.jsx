import { useState } from "react";
import { Send } from "lucide-react";

import "./chat.css";

const MessageInput = ({ onSend, sending }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const value = message.trim();

    if (!value || sending) {
      return;
    }

    await onSend(value);

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSubmit();
    }
  };

  return (
    <div className="message-input">
      <textarea
        value={message}
        placeholder="Type your message..."
        onChange={(event) => setMessage(event.target.value)}
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
