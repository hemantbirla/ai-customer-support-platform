import authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import User from "../models/User.js";

// Utility wrapper to catch async errors cleanly without try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days matching JWT_REFRESH_EXPIRES_IN
};

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  return res
    .status(STATUS_CODES.CREATED || 201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  // If your service returns tokens (e.g., { user, accessToken, refreshToken })
  if (result?.refreshToken) {
    res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);
  }

  return res
    .status(STATUS_CODES.OK || 200)
    .json(new ApiResponse(200, "Login successful", result));
});

export const logout = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "You are not logged in");
  }

  const userId = req.user.id || req.user._id;
  await authService.logout(userId);

  // Clear HTTP-only cookies on logout
  res.clearCookie("refreshToken", COOKIE_OPTIONS);

  return res
    .status(STATUS_CODES.OK || 200)
    .json(new ApiResponse(200, "Logged out successfully"));
});

export const refresh = asyncHandler(async (req, res) => {
  // Check for refreshToken in either cookies or request body
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!token) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED || 401,
      "Refresh token missing or expired",
    );
  }

  const result = await authService.refreshAccessToken(token);

  if (result?.refreshToken) {
    res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);
  }

  return res
    .status(STATUS_CODES.OK || 200)
    .json(new ApiResponse(200, "Access token refreshed successfully", result));
});

export const getProfile = asyncHandler(async (req, res) => {
  return res
    .status(STATUS_CODES.OK || 200)
    .json(new ApiResponse(200, "Profile fetched successfully", req.user));
});

// ==========================================
// Get Users
// ==========================================

export const getUsers = asyncHandler(async (req, res) => {
  const { role } = req.query;

  const filter = {};

  if (role) {
    filter.role = role;
  }

  const users = await User.find(filter)
    .select("_id name email role")
    .sort({ name: 1 });

  return res
    .status(STATUS_CODES.OK || 200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});
