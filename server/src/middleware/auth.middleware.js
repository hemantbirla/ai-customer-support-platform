import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Authentication required"));
    }

    const token = authHeader.split(" ")[1];

    // Ensure this matches your .env key (JWT_ACCESS_SECRET or env.JWT_ACCESS_SECRET)
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET || env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;
    console.log("Authenticated User:", req.user);

    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

export default authMiddleware;
