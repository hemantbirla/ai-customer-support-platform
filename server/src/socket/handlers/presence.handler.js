import onlineUsers from "../onlineUsers.js";

const registerPresenceHandler = async (io, socket) => {
  const userId = socket.user._id.toString();

  let sockets = onlineUsers.get(userId);

  if (!sockets) {
    sockets = new Set();
  }

  sockets.add(socket.id);

  onlineUsers.set(userId, sockets);

  console.log("ONLINE USERS");
  console.log([...onlineUsers.keys()]);

  // Send current online list to the newly connected user
  socket.emit("presence:sync", {
    onlineUsers: [...onlineUsers.keys()],
  });

  // Notify everyone else
  socket.broadcast.emit("presence:update", {
    userId,
    online: true,
  });

  socket.on("disconnect", () => {
    const currentSockets = onlineUsers.get(userId);

    if (!currentSockets) {
      return;
    }

    currentSockets.delete(socket.id);

    if (currentSockets.size === 0) {
      onlineUsers.delete(userId);

      console.log("ONLINE USERS");
      console.log([...onlineUsers.keys()]);

      socket.broadcast.emit("presence:update", {
        userId,
        online: false,
      });
    } else {
      onlineUsers.set(userId, currentSockets);
    }
  });
};

export default registerPresenceHandler;
