import { useState } from "react";

export const useChat = () => {
  const [messages] = useState([]);
  const [loading] = useState(false);
  const [error] = useState(null);

  const sendMessage = async () => {};

  const refreshMessages = async () => {};

  return {
    messages,
    loading,
    error,
    sendMessage,
    refreshMessages,
  };
};
