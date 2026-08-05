import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import chatService from "../services/chatService";
import useAuth from "./useAuth";

export const useChat = (ticketId) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const refreshMessages = useCallback(async () => {
    if (!ticketId) return;

    try {
      setLoading(true);
      setError("");

      const response = await chatService.getConversation(ticketId);
      // Cleaned up duplicate state setting
      setMessages(response?.data?.data ?? []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to load conversation.");
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    try {
      setSending(true);

      const optimisticMessage = {
        _id: `temp-${Date.now()}`,
        message: text,
        sender: {
          _id: user?._id,
          name: user?.name,
        },
        createdAt: new Date().toISOString(),
        pending: true,
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      // Removed undefined `receiverId` payload property
      await chatService.sendMessage(ticketId, { message: text });

      await refreshMessages();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to send message.");
      await refreshMessages();
    } finally {
      setSending(false);
    }
  };

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
