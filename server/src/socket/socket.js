import { Server } from "socket.io";

import socketAuth from "./middleware/socketAuth.js";

import { setSocketServer } from "./index.js";

import registerChatHandlers from "./handlers/chat.handler.js";

import { registerPresenceHandler } from "./handlers/presence.handler.js";

import { registerNotificationHandler } from "./handlers/notification.handler.js";

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    },

    transports: ["websocket", "polling"],
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`🔌 Socket Connected : ${socket.user.name}`);

    registerPresenceHandler(io, socket);

    registerChatHandler(io, socket);

    registerNotificationHandler(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`❌ ${socket.user.name} disconnected (${reason})`);
    });
  });

  setSocketServer(io);

  return io;
};
