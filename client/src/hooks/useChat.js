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
    if (!ticketId || !user) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await chatService.getConversation(ticketId);

      const conversation = response.data;

      const conversationMessages = Array.isArray(conversation.data)
        ? conversation.data
        : [];

      setMessages(conversationMessages);

      // ==========================================
      // Mark Existing Unread Messages as Read
      // ==========================================

      const unreadMessageIds = conversationMessages
        .filter(
          (message) =>
            String(message.receiver?._id) === String(user._id) &&
            !message.readAt,
        )
        .map((message) => message._id);

      if (unreadMessageIds.length > 0) {
        console.log("👀 Marking existing messages as read:", unreadMessageIds);

        if (socket.connected) {
          socket.emit("mark-read", {
            ticketId,
            messageIds: unreadMessageIds,
          });
        }
      }
    } catch (err) {
      console.error("❌ Load conversation error:", err);

      setError(err?.response?.data?.message || "Unable to load conversation.");
    } finally {
      setLoading(false);
    }
  }, [ticketId, user]);

  // ==========================================
  // Send Message
  // ==========================================

  const sendMessage = useCallback(
    (text) => {
      const value = text?.trim();

      if (!value) {
        return;
      }

      if (!ticketId) {
        toast.error("Ticket not found.");
        return;
      }

      if (!socket.connected) {
        toast.error("Chat connection unavailable.");
        console.error("❌ Socket is not connected.");
        return;
      }

      setSending(true);

      socket.emit(
        "send-message",
        {
          ticketId,
          message: value,
          attachments: [],
        },
        (response) => {
          setSending(false);

          if (!response?.success) {
            toast.error(response?.message || "Unable to send message.");
            return;
          }

          console.log("✅ Message sent:", response.data);

          setMessages((prev) => {
            const exists = prev.some(
              (item) => String(item._id) === String(response.data._id),
            );

            if (exists) {
              return prev;
            }

            return [response.data, ...prev];
          });
        },
      );
    },
    [ticketId],
  );

  // ==========================================
  // Join Ticket
  // ==========================================

  const joinTicket = useCallback(() => {
    if (!ticketId) {
      return;
    }

    if (!socket.connected) {
      console.log("⏳ Cannot join ticket. Socket is disconnected.");

      return;
    }

    console.log("🚪 Joining ticket room:", `ticket_${ticketId}`);

    socket.emit("join-ticket", {
      ticketId,
    });
  }, [ticketId]);

  // ==========================================
  // Socket Connection + Ticket Room
  // ==========================================

  useEffect(() => {
    if (!ticketId || !user) {
      return;
    }

    let mounted = true;

    const handleConnect = async () => {
      if (!mounted) {
        return;
      }

      console.log("🟢 Chat socket connected:", socket.id);

      joinTicket();

      await refreshMessages();
    };

    const handleDisconnect = (reason) => {
      console.log("🔴 Chat socket disconnected:", reason);
    };

    const handleConnectError = (error) => {
      console.error("❌ Socket connection error:", error.message);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    if (socket.connected) {
      joinTicket();
      refreshMessages();
    }

    return () => {
      mounted = false;

      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);

      if (socket.connected) {
        socket.emit("leave-ticket", {
          ticketId,
        });

        console.log("🚪 Leaving ticket room:", `ticket_${ticketId}`);
      }
    };
  }, [ticketId, user, joinTicket, refreshMessages]);

  // ==========================================
  // Receive New Message
  // ==========================================

  useEffect(() => {
    if (!ticketId || !user) {
      return;
    }

    const handleNewMessage = (message) => {
      console.log("📨 NEW MESSAGE RECEIVED:", message);

      setMessages((prev) => {
        const exists = prev.some(
          (item) => String(item._id) === String(message._id),
        );

        if (exists) {
          return prev;
        }

        return [message, ...prev];
      });

      const isReceiver = String(message.receiver?._id) === String(user._id);

      if (!isReceiver) {
        return;
      }

      if (socket.connected) {
        console.log("📦 Sending delivered:", message._id);

        socket.emit("message:delivered", {
          messageId: message._id,
        });
      }

      if (socket.connected) {
        console.log("👀 Sending read:", message._id);

        socket.emit("mark-read", {
          ticketId,
          messageIds: [message._id],
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
      console.log("📦 DELIVERED EVENT RECEIVED:", {
        messageId,
        deliveredAt,
      });

      setMessages((prev) =>
        prev.map((message) => {
          if (String(message._id) !== String(messageId)) {
            return message;
          }

          return {
            ...message,
            deliveredAt:
              deliveredAt || message.deliveredAt || new Date().toISOString(),
          };
        }),
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
      console.log("✅ READ EVENT RECEIVED:", {
        messageId,
        readAt,
      });

      setMessages((prev) =>
        prev.map((message) => {
          if (String(message._id) !== String(messageId)) {
            return message;
          }

          return {
            ...message,
            readAt: readAt || message.readAt || new Date().toISOString(),
          };
        }),
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
    if (!user) {
      return;
    }

    const handleTyping = ({ user: typingUserData, isTyping }) => {
      if (!typingUserData) {
        return;
      }

      if (String(typingUserData._id) === String(user._id)) {
        return;
      }

      console.log("⌨️ Typing:", typingUserData.name, isTyping);

      setTypingUser(isTyping ? typingUserData : null);
    };

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [user]);

  // ==========================================
  // Presence Update Listener
  // ==========================================

  useEffect(() => {
    const handlePresenceChange = (data) => {
      console.log("🟢/🔴 Presence update received:", data);
    };

    socket.on("presence:update", handlePresenceChange);
    socket.on("user:offline", handlePresenceChange);

    return () => {
      socket.off("presence:update", handlePresenceChange);
      socket.off("user:offline", handlePresenceChange);
    };
  }, []);

  // ==========================================
  // Return
  // ==========================================

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
