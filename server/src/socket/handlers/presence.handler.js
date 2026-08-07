import {
  addOnlineUser,
  removeOnlineUser,
  getOnlineUsers,
} from "../onlineUsers.js";

/**
 * Register Presence Events
 */

const registerPresenceHandler = (io, socket) => {
  const userId = socket.user._id.toString();

  /**
   * Add user
   */

  addOnlineUser(userId, socket.id);

  console.log(`🟢 ${socket.user.name} is online`);

  /**
   * Send full online list to everyone
   */

  io.emit("presence:sync", {
    onlineUsers: getOnlineUsers(),
  });

  /**
   * Broadcast online event
   */

  io.emit("presence:update", {
    userId,
    online: true,
  });

  /**
   * Disconnect
   */

  socket.on("disconnect", () => {
    const disconnected = removeOnlineUser(userId, socket.id);

    if (!disconnected) {
      return;
    }

    console.log(`🔴 ${socket.user.name} is offline`);

    io.emit("presence:update", {
      userId,
      online: false,
    });

    io.emit("presence:sync", {
      onlineUsers: getOnlineUsers(),
    });
  });
};

export default registerPresenceHandler;
