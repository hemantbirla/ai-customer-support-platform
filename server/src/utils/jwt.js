import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import ApiError from "./ApiError.js"; // 💡 Ensure this path points to your ApiError utility
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN || "15m",
    },
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
  );
};

/**
 * Verifies an Access Token and normalizes errors
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
  } catch (error) {
    // Optional: You can split this into distinct messages if needed
    if (error.name === "TokenExpiredError") {
      throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Access token has expired");
    }
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.AUTH.INVALID_TOKEN);
  }
};

/**
 * Verifies a Refresh Token and normalizes errors
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_REFRESH_TOKEN || MESSAGES.AUTH.INVALID_TOKEN,
    );
  }
};
