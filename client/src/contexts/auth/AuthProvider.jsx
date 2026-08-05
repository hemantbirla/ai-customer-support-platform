import { useCallback, useEffect, useMemo, useState } from "react";

import AuthContext from "./AuthContext";

import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../../services/auth.service";

import { tokenService } from "../../services/token.service";
import { socket } from "../../socket/socket";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  const initializeAuth = useCallback(async () => {
    const token = tokenService.getAccessToken();

    if (!token) {
      setInitialized(true);
      return;
    }

    try {
      const response = await getProfile();
      setUser(response.data);
      const token = tokenService.getAccessToken();
      socket.auth = {
        token,
      };

      if (!socket.connected) {
        socket.connect();
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);

      tokenService.removeAccessToken();
      socket.disconnect();
      setUser(null);
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(async (payload) => {
    setLoading(true);

    try {
      const response = await loginUser(payload);

      const { user, accessToken } = response.data;

      tokenService.setAccessToken(accessToken);

      socket.auth = {
        token: accessToken,
      };

      socket.connect();

      setUser(user);

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);

    try {
      return await registerUser(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      socket.disconnect();
      tokenService.removeAccessToken();
      setUser(null);
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await getProfile();
    setUser(data);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      initialized,
      isAuthenticated,
      login,
      register,
      logout,
      refreshUser,
    }),
    [
      user,
      loading,
      initialized,
      isAuthenticated,
      login,
      register,
      logout,
      refreshUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
