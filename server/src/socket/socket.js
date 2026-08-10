import { Server } from "socket.io";

import User from "../models/User.js";
import { env } from "../config/env.js";
import { verifyAccessToken } from "../utils/jwt.js";

import registerChatHandlers from "./handlers/chat.handler.js";
import registerPresenceHandler from "./handlers/presence.handler.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
    },
  });

  // ==========================================
  // Authentication
  // ==========================================

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = verifyAccessToken(token);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;

      next();
    } catch (error) {
      console.error("Socket Authentication Error:", error.message);

      next(new Error("Socket authentication failed"));
    }
  });

  // ==========================================
  // Connection
  // ==========================================

  io.on("connection", async (socket) => {
    const userId = socket.user._id.toString();

    console.log(`🟢 Socket connected: ${socket.user.name} (${socket.id})`);

    // ==========================================
    // USER ROOM
    // ==========================================

    socket.join(`user_${userId}`);

    console.log(`👤 Joined user room: user_${userId}`);

    // ==========================================
    // Update Last Seen
    // ==========================================

    await User.findByIdAndUpdate(userId, {
      lastSeen: new Date(),
    });

    // ==========================================
    // Presence
    // ==========================================

    registerPresenceHandler(io, socket);

    // ==========================================
    // Chat
    // ==========================================

    registerChatHandlers(io, socket);

    // ==========================================
    // Disconnect
    // ==========================================

    socket.on("disconnect", async (reason) => {
      console.log(`🔴 Socket disconnected: ${socket.user.name} (${reason})`);

      await User.findByIdAndUpdate(userId, {
        lastSeen: new Date(),
      });
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized");
  }

  return io;
};
