import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useChat from "../../hooks/useChat";
import useAuth from "../../hooks/useAuth";

import ConversationHeader from "./ConversationHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyConversation from "./EmptyConversation";
import ChatSkeleton from "./ChatSkeleton";
import TypingIndicator from "./TypingIndicator";

import { getTicketById } from "../../services/ticket.service";

import "./chat.css";

const ChatPage = () => {
  const { ticketId } = useParams();

  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [ticketLoading, setTicketLoading] = useState(true);
  const [ticketError, setTicketError] = useState("");

  // ==========================================
  // Load Ticket
  // ==========================================

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setTicketLoading(true);
        setTicketError("");

        const response = await getTicketById(ticketId);

        // IMPORTANT
        setTicket(response.data.data.ticket);
      } catch (error) {
        console.error(error);

        setTicketError(
          error.response?.data?.message || "Unable to load ticket.",
        );
      } finally {
        setTicketLoading(false);
      }
    };

    if (ticketId) {
      loadTicket();
    }
  }, [ticketId]);

  // ==========================================
  // Receiver
  // ==========================================

  let receiverId = null;

  if (ticket && user) {
    if (user.role === "CUSTOMER") {
      receiverId = ticket.assignedAgent?._id || null;
    }

    if (user.role === "AGENT") {
      receiverId = ticket.customer?._id || null;
    }

    if (user.role === "ADMIN") {
      receiverId = ticket.assignedAgent?._id || ticket.customer?._id || null;
    }
  }

  // ==========================================
  // Chat Hook
  // ==========================================

  const {
    messages,
    loading,
    error,
    sending,
    typingUser,
    sendMessage,
    refreshMessages,
  } = useChat(ticketId, receiverId);

  // ==========================================
  // Loading
  // ==========================================

  if (loading || ticketLoading) {
    return <ChatSkeleton />;
  }

  // ==========================================
  // Error
  // ==========================================

  if (error || ticketError) {
    return (
      <div className="chat-page">
        <div className="chat-error">
          <h3>Unable to load conversation</h3>

          <p>{error || ticketError}</p>

          <button className="chat-retry-btn" onClick={refreshMessages}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="chat-page">
      <ConversationHeader ticket={ticket} />

      <div className="chat-body">
        {messages.length === 0 ? (
          <EmptyConversation />
        ) : (
          <MessageList messages={messages} />
        )}

        {typingUser && (
          <div className="typing-indicator">{typingUser.name} is typing...</div>
        )}
      </div>
      {typingUser && <TypingIndicator user={typingUser} />}
      <MessageInput
        onSend={sendMessage}
        sending={sending}
        ticketId={ticketId}
      />
    </div>
  );
};

export default ChatPage;
