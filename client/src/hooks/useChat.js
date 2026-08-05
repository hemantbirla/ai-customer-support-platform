import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import chatService from "../services/chatService";

export const useChat = (ticketId) => {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // Fetch Conversation
  // ==========================================

  const refreshMessages = useCallback(async () => {
    if (!ticketId) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await chatService.getConversation(ticketId);

      setMessages(response.data.data || []);
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to load conversation.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  // ==========================================
  // Send Message
  // ==========================================

  const sendMessage = async (message) => {
    if (!message.trim()) {
      return;
    }

    try {
      setSending(true);

      await chatService.sendMessage(ticketId, {
        message,
      });

      toast.success("Message sent");

      await refreshMessages();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send message.");
    } finally {
      setSending(false);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    refreshMessages();
  }, [refreshMessages]);

  return {
    messages,

    loading,

    sending,

    error,

    sendMessage,

    refreshMessages,
  };
};

export default useChat;
