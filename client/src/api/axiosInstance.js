import axios from "axios";
import { API, AUTH_ENDPOINTS } from "../constants/api";
import { tokenService } from "../services/token.service";

const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
  timeout: API.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// -------------------------
// Request Interceptor
// -------------------------

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// -------------------------
// Response Interceptor
// -------------------------

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Check if the request came from auth endpoints that shouldn't trigger token refresh
    const requestUrl = originalRequest?.url || "";
    const isLoginRequest = requestUrl.includes(
      AUTH_ENDPOINTS?.LOGIN || "/auth/login",
    );
    const isRegisterRequest = requestUrl.includes(
      AUTH_ENDPOINTS?.REGISTER || "/auth/register",
    );
    const isRefreshRequest = requestUrl.includes(
      AUTH_ENDPOINTS?.REFRESH || "/auth/refresh",
    );

    // Only attempt refresh if it's a 401 AND NOT a login, register, or refresh request
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLoginRequest &&
      !isRegisterRequest &&
      !isRefreshRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${API.BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.data.accessToken;

        tokenService.setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        tokenService.removeAccessToken();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
