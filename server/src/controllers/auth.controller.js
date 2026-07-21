import authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// Utility wrapper to catch async errors cleanly without try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  return res
    .status(STATUS_CODES.CREATED || 201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
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

  // Clear HTTP-only cookies if set
  res.clearCookie("refreshToken");

  return res
    .status(STATUS_CODES.OK || 200)
    .json(new ApiResponse(200, "Logged out successfully"));
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Refresh token is required");
  }

  const result = await authService.refreshAccessToken(refreshToken);

  return res
    .status(STATUS_CODES.OK || 200)
    .json(new ApiResponse(200, "Access token refreshed successfully", result));
});

export const getProfile = asyncHandler(async (req, res) => {
  return res
    .status(STATUS_CODES.OK || 200)
    .json(new ApiResponse(200, "Profile fetched successfully", req.user));
});
