import axiosInstance from "./axiosInstance";
import { AUTH_ENDPOINTS } from "../constants/api";

export const login = (payload) =>
  axiosInstance.post(AUTH_ENDPOINTS.LOGIN, payload);

export const register = (payload) =>
  axiosInstance.post(AUTH_ENDPOINTS.REGISTER, payload);

export const getProfile = () => axiosInstance.get(AUTH_ENDPOINTS.PROFILE);

export const logout = () => axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
