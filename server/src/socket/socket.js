import { Server } from "socket.io";
import User from "../models/User.js";

import { verifyAccessToken } from "../utils/jwt.js";

import registerChatHandlers from "./handlers/chat.handler.js";

let io;

const onlineUsers = new Map();

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  // ==========================================
  // Socket Authentication
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

      next(error);
    }
  });

  // ==========================================
  // Socket Connection
  // ==========================================

  io.on("connection", (socket) => {
    console.log(`🟢 ${socket.user.name} connected`);

    onlineUsers.set(socket.user._id.toString(), socket.id);

    io.emit("user:online", {
      userId: socket.user._id,
    });

    registerChatHandlers(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`🔴 ${socket.user.name} disconnected (${reason})`);

      onlineUsers.delete(socket.user._id.toString());

      io.emit("user:offline", {
        userId: socket.user._id,
      });
    });
  });

  return io;
};

export const getIO = () => io;

export const getOnlineUsers = () => onlineUsers;
