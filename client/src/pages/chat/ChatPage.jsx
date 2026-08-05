import { useParams } from "react-router-dom";
import ConversationHeader from "./ConversationHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyConversation from "./EmptyConversation";
import ChatSkeleton from "./ChatSkeleton";
import { useChat } from "../../hooks/useChat";

import "./chat.css";

const ChatPage = () => {
  const { ticketId } = useParams();
  const { messages, loading, sending, error, sendMessage, refreshMessages } =
    useChat(ticketId);

  if (loading) {
    return <ChatSkeleton />;
  }

  if (error) {
    return (
      <div className="chat-page">
        <div className="chat-error">
          <h3>Unable to load conversation</h3>
          <p>{error}</p>
          <button className="chat-retry-btn" onClick={refreshMessages}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <ConversationHeader ticketId={ticketId} />

      <div className="chat-body">
        {messages.length === 0 ? (
          <EmptyConversation />
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      <MessageInput onSend={sendMessage} sending={sending} />
    </div>
  );
};

export default ChatPage;
