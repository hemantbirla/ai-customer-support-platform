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
  // Receiver Id
  // ==========================================

  let receiverId = null;

  if (ticket && user) {
    switch (user.role) {
      case "CUSTOMER":
        receiverId = ticket.assignedAgent?._id || null;
        break;

      case "AGENT":
        receiverId = ticket.customer?._id || null;
        break;

      case "ADMIN":
        receiverId = ticket.assignedAgent?._id || ticket.customer?._id || null;
        break;

      default:
        receiverId = null;
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
  // Refresh on Window Focus
  // ==========================================

  useEffect(() => {
    const handleFocus = () => {
      refreshMessages();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshMessages]);

  // ==========================================
  // Loading
  // ==========================================

  if (ticketLoading || loading) {
    return <ChatSkeleton />;
  }

  // ==========================================
  // Error
  // ==========================================

  if (ticketError || error) {
    return (
      <div className="chat-page">
        <div className="chat-error">
          <h3>Unable to load conversation</h3>

          <p>{ticketError || error}</p>

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

        {typingUser && <TypingIndicator user={typingUser} />}
      </div>

      <MessageInput
        onSend={sendMessage}
        sending={sending}
        ticketId={ticketId}
      />
    </div>
  );
};

export default ChatPage;
