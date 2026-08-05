import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import chatService from "../services/chatService";
import { socket } from "../socket/socket";
import useAuth from "./useAuth";

const useChat = (ticketId, receiverId) => {
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

      if (!receiverId) {
        toast.error("Receiver not found");
        return;
      }

      setSending(true);

      socket.emit(
        "send-message",
        {
          ticketId,
          receiver: receiverId,
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
    [ticketId, receiverId],
  );

  // ==========================================
  // Join Room
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
  // New Message
  // ==========================================

  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log("📩 Socket received:", message);

      setMessages((prev) => {
        if (!Array.isArray(prev)) {
          return [message];
        }

        const exists = prev.some((m) => m._id === message._id);

        if (exists) {
          return prev;
        }

        return [message, ...prev];
      });
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, []);

  // ==========================================
  // Typing
  // ==========================================

  useEffect(() => {
    const handleTyping = ({ user, isTyping }) => {
      setTypingUser(isTyping ? user : null);
    };

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, []);

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
