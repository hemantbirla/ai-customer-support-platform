import axiosInstance from "../api/axiosInstance";

const AUTH_BASE_URL = "/auth";

/**
 * Register a new user
 */
export const registerUser = async (payload) => {
  const response = await axiosInstance.post(
    `${AUTH_BASE_URL}/register`,
    payload,
  );

  return response.data;
};

/**
 * Login user
 */
export const loginUser = async (payload) => {
  const response = await axiosInstance.post(`${AUTH_BASE_URL}/login`, payload);

  return response.data;
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  const response = await axiosInstance.post(`${AUTH_BASE_URL}/logout`);

  return response.data;
};
/**
 * Get users (optionally filtered by role, e.g., 'AGENT')
 */
export const getUsers = async (params = {}) => {
  const response = await axiosInstance.get("/auth", {
    params,
  });

  return response.data;
};
/**
 * Refresh access token
 */
export const refreshToken = async () => {
  const response = await axiosInstance.post(`${AUTH_BASE_URL}/refresh`);

  return response.data;
};

/**
 * Get logged-in user profile
 */
export const getProfile = async () => {
  const response = await axiosInstance.get(`${AUTH_BASE_URL}/profile`);

  return response.data;
};

/**
 * Update profile
 */
export const updateProfile = async (payload) => {
  const response = await axiosInstance.put(`${AUTH_BASE_URL}/profile`, payload);

  return response.data;
};
