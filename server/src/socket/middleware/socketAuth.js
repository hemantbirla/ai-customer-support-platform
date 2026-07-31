import User from "../../models/User.js";

import { verifyAccessToken } from "../../utils/jwt.js";

const socketAuth = async (socket, next) => {
  try {
    let token = socket.handshake.auth?.token;

    if (!token) {
      const authHeader = socket.handshake.headers.authorization;

      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log(`🟢 Socket Authenticated : ${user.name} (${user.role})`);

    next();
  } catch (error) {
    console.error("Socket Authentication Failed");

    next(new Error("Unauthorized"));
  }
};

export default socketAuth;
