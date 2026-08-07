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
      console.error(error);

      next(new Error("Invalid token"));
    }
  });

  // ==========================================
  // Connection
  // ==========================================

  io.on("connection", async (socket) => {
    console.log(`🟢 ${socket.user.name} connected`);

    await User.findByIdAndUpdate(socket.user._id, {
      lastSeen: new Date(),
    });

    registerPresenceHandler(io, socket);

    registerChatHandlers(io, socket);
  });

  return io;
};

export const getIO = () => io;
