import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket"],
  auth: {
    token: null,
  },
});

socket.on("connect", () => {
  console.log("🟢 Socket Connected");
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Socket Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket Error:", error.message);
});
