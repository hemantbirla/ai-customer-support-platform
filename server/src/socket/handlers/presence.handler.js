import { NOTIFICATION_EVENTS } from "../events/notification.events.js";

const onlineUsers = new Map();

/**
 * Handle User Presence
 */
export const registerPresenceHandler = (io, socket) => {
  const userId = socket.user.id;

  // Multiple browser tabs support
  const connections = onlineUsers.get(userId) || new Set();

  connections.add(socket.id);

  onlineUsers.set(userId, connections);

  console.log(
    `🟢 ${socket.user.name} connected (${connections.size} connections)`,
  );

  io.emit(NOTIFICATION_EVENTS.USER_ONLINE, {
    userId,
  });

  socket.on("disconnect", () => {
    const sockets = onlineUsers.get(userId);

    if (!sockets) return;

    sockets.delete(socket.id);

    if (sockets.size === 0) {
      onlineUsers.delete(userId);

      io.emit(NOTIFICATION_EVENTS.USER_OFFLINE, {
        userId,
      });

      console.log(`⚫ ${socket.user.name} disconnected`);
    } else {
      onlineUsers.set(userId, sockets);
    }
  });
};

export const isUserOnline = (userId) => {
  return onlineUsers.has(userId.toString());
};

export default onlineUsers;
