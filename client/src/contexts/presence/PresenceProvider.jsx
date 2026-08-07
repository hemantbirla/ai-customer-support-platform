import { useEffect, useMemo, useState } from "react";

import PresenceContext from "./PresenceContext";
import { socket } from "../../socket/socket";

const PresenceProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    /**
     * Initial online users
     */
    const handlePresenceSync = ({ onlineUsers }) => {
      setOnlineUsers(onlineUsers);
    };

    /**
     * User online/offline
     */
    const handlePresenceUpdate = ({ userId, online }) => {
      setOnlineUsers((prev) => {
        if (online) {
          if (prev.includes(userId)) {
            return prev;
          }

          return [...prev, userId];
        }

        return prev.filter((id) => id !== userId);
      });
    };

    socket.on("presence:sync", handlePresenceSync);
    socket.on("presence:update", handlePresenceUpdate);

    return () => {
      socket.off("presence:sync", handlePresenceSync);
      socket.off("presence:update", handlePresenceUpdate);
    };
  }, []);

  const isOnline = (userId) => {
    if (!userId) {
      return false;
    }

    return onlineUsers.includes(userId.toString());
  };

  const value = useMemo(
    () => ({
      onlineUsers,
      isOnline,
    }),
    [onlineUsers],
  );

  return (
    <PresenceContext.Provider value={value}>
      {children}
    </PresenceContext.Provider>
  );
};

export default PresenceProvider;
