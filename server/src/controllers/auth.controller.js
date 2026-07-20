import asyncHandler from "../utils/asyncHandler.js";
// 💡 FIX: Import it as a default export instead of * as authService
import authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return res.json(new ApiResponse(200, "Login successful", result));
});

// export const login = async (req, res) => {};

// export const logout = async (req, res) => {};

// export const refresh = async (req, res) => {};

// export const getProfile = async (req, res) => {};

// export const updateProfile = async (req, res) => {};
