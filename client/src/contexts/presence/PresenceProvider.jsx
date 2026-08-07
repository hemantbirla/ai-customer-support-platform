import { useEffect, useMemo, useState } from "react";

import PresenceContext from "./PresenceContext";
import { socket } from "../../socket/socket";

const PresenceProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const handleSync = ({ onlineUsers }) => {
      console.log("Presence Sync:", onlineUsers);

      setOnlineUsers(onlineUsers);
    };

    const handlePresenceUpdate = ({ userId, online }) => {
      console.log("Presence Update:", userId, online);

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

    socket.on("presence:sync", handleSync);
    socket.on("presence:update", handlePresenceUpdate);

    return () => {
      socket.off("presence:sync", handleSync);
      socket.off("presence:update", handlePresenceUpdate);
    };
  }, []);

  const isOnline = (userId) => {
    if (!userId) return false;

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
