const onlineUsers = new Map();

/**
 * Store socket connection
 * Supports multiple browser tabs
 */

export const addOnlineUser = (userId, socketId) => {
  const id = userId.toString();

  const sockets = onlineUsers.get(id) || new Set();

  sockets.add(socketId);

  onlineUsers.set(id, sockets);
};

/**
 * Remove socket connection
 */

export const removeOnlineUser = (userId, socketId) => {
  const id = userId.toString();

  const sockets = onlineUsers.get(id);

  if (!sockets) {
    return false;
  }

  sockets.delete(socketId);

  if (sockets.size === 0) {
    onlineUsers.delete(id);
    return true;
  }

  onlineUsers.set(id, sockets);

  return false;
};

/**
 * Is user online
 */

export const isUserOnline = (userId) => {
  return onlineUsers.has(userId.toString());
};

/**
 * Get all online users
 */

export const getOnlineUsers = () => {
  return [...onlineUsers.keys()];
};

export default onlineUsers;
