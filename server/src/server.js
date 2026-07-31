import "dotenv/config";
import http from "http";

import app from "./app.js";

import { connectDatabase } from "./config/database.js";

import { initializeSocket } from "./socket/socket.js";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDatabase();

    // Create HTTP Server
    const httpServer = http.createServer(app);

    // Initialize Socket.io
    initializeSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log("=================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 API : http://localhost:${PORT}`);
      console.log(`⚡ Socket.io Initialized`);
      console.log("=================================");
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();
