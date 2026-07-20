import jwt from "jsonwebtoken";
// 💡 FIX: Import your centralized env configuration
import { env } from "../config/env.js";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET, // 💡 FIX: Fallback to env object
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET, // 💡 FIX: Fallback to env object
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );
};

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET);
