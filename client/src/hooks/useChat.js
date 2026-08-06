import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import chatService from "../services/chatService";
import { socket } from "../socket/socket";
import useAuth from "./useAuth";

const useChat = (ticketId) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // Load Conversation
  // ==========================================

  const refreshMessages = useCallback(async () => {
    if (!ticketId) return;

    try {
      setLoading(true);
      setError("");

      const response = await chatService.getConversation(ticketId);

      const conversation = response.data;

      setMessages(Array.isArray(conversation.data) ? conversation.data : []);
    } catch (err) {
      console.error(err);

      setError(err?.response?.data?.message || "Unable to load conversation.");
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  // ==========================================
  // Send Message
  // ==========================================

  const sendMessage = useCallback(
    (text) => {
      if (!text.trim()) return;

      setSending(true);

      socket.emit(
        "send-message",
        {
          ticketId,
          message: text,
          attachments: [],
        },
        (response) => {
          setSending(false);

          if (!response.success) {
            toast.error(response.message);
          }
        },
      );
    },
    [ticketId],
  );

  // ==========================================
  // Join Ticket Room
  // ==========================================

  useEffect(() => {
    if (!ticketId) return;

    socket.emit("join-ticket", { ticketId });

    refreshMessages();

    return () => {
      socket.emit("leave-ticket", { ticketId });
    };
  }, [ticketId, refreshMessages]);

  // ==========================================
  // Receive New Message
  // ==========================================

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === message._id);

        if (exists) return prev;

        return [message, ...prev];
      });

      // Notify server that receiver got the message
      if (user && String(message.receiver?._id) === String(user._id)) {
        console.log("Receiver", message.receiver?._id, "Current", user._id);
        console.log(message.deliveredAt);
        socket.emit("message:delivered", {
          messageId: message._id,
          ticketId,
        });
      }
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [ticketId, user]);

  // ==========================================
  // Message Delivered
  // ==========================================

  useEffect(() => {
    const handleDelivered = ({ messageId, deliveredAt }) => {
      console.log("📦 Delivered:", {
        messageId,
        deliveredAt,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          String(msg._id) === String(messageId)
            ? {
                ...msg,
                deliveredAt,
              }
            : msg,
        ),
      );
    };

    socket.on("message:delivered", handleDelivered);

    return () => {
      socket.off("message:delivered", handleDelivered);
    };
  }, []);

  // ==========================================
  // Message Read
  // ==========================================

  useEffect(() => {
    const handleRead = ({ messageId, readAt }) => {
      setMessages((prev) =>
        prev.map((message) =>
          String(message._id) === String(messageId)
            ? {
                ...message,
                readAt,
              }
            : message,
        ),
      );
    };

    socket.on("message:read", handleRead);

    return () => {
      socket.off("message:read", handleRead);
    };
  }, []);

  // ==========================================
  // Typing Indicator
  // ==========================================

  useEffect(() => {
    const handleTyping = ({ user: typingUser, isTyping }) => {
      if (String(typingUser._id) === String(user?._id)) return;

      setTypingUser(isTyping ? typingUser : null);
    };

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [user]);

  return {
    messages,
    loading,
    sending,
    typingUser,
    error,
    sendMessage,
    refreshMessages,
  };
};

export default useChat;
