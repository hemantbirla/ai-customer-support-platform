import axiosInstance from "./axiosInstance";
import { AUTH_ENDPOINTS } from "../constants/api";

export const authApi = {
  login(data) {
    return axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
  },

  register(data) {
    return axiosInstance.post(AUTH_ENDPOINTS.REGISTER, data);
  },

  logout() {
    return axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
  },

  refresh() {
    return axiosInstance.post(AUTH_ENDPOINTS.REFRESH);
  },

  profile() {
    return axiosInstance.get(AUTH_ENDPOINTS.PROFILE);
  },
};
