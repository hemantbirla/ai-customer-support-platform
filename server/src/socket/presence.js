const onlineUsers = new Map();

/**
 * Add socket connection for a user
 *
 * Structure:
 *
 * userId -> Set(socketId)
 *
 * This supports multiple browser tabs/windows.
 */
export const addOnlineUser = (userId, socketId) => {
  const id = userId.toString();

  const sockets = onlineUsers.get(id) || new Set();

  sockets.add(socketId);

  onlineUsers.set(id, sockets);
};

/**
 * Remove one socket connection
 */
export const removeOnlineUser = (userId, socketId) => {
  const id = userId.toString();

  const sockets = onlineUsers.get(id);

  if (!sockets) {
    return;
  }

  sockets.delete(socketId);

  if (sockets.size === 0) {
    onlineUsers.delete(id);
  } else {
    onlineUsers.set(id, sockets);
  }
};

/**
 * Check whether user is online
 */
export const isUserOnline = (userId) => {
  return onlineUsers.has(userId.toString());
};

/**
 * Get all socket IDs for a user
 */
export const getUserSocketIds = (userId) => {
  const sockets = onlineUsers.get(userId.toString());

  if (!sockets) {
    return [];
  }

  return [...sockets];
};

/**
 * Get all online user IDs
 */
export const getOnlineUsers = () => {
  return [...onlineUsers.keys()];
};

/**
 * Get complete registry
 *
 * Useful for debugging.
 */
export const getOnlineUsersMap = () => {
  return onlineUsers;
};
