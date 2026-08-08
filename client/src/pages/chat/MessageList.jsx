import { useEffect, useMemo, useRef } from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages = [] }) => {
  const bottomRef = useRef(null);

  const orderedMessages = useMemo(() => {
    if (!Array.isArray(messages)) {
      return [];
    }

    return [...messages].reverse();
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [orderedMessages]);

  return (
    <div className="message-list">
      {orderedMessages.map((message) => (
        <MessageBubble key={message._id} message={message} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
