import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  getProfile,
} from "../services/auth.service";

import { tokenService } from "../services/token.service";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [initialized, setInitialized] = useState(false);

  const isAuthenticated = !!user;

  const initializeAuth = useCallback(async () => {
    const token = tokenService.getAccessToken();

    if (!token) {
      setInitialized(true);
      return;
    }

    try {
      const response = await getProfile();

      setUser(response.data.user);
    } catch (error) {
      tokenService.removeAccessToken();
      setUser(null);
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (payload) => {
    setLoading(true);

    try {
      const response = await loginUser(payload);

      const { user, accessToken } = response.data;

      tokenService.setAccessToken(accessToken);

      setUser(user);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);

    try {
      return await registerUser(payload);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      tokenService.removeAccessToken();

      setUser(null);

      setLoading(false);
    }
  };

  const refreshUser = async () => {
    const response = await getProfile();

    setUser(response.data.user);
  };

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
    [user, loading, initialized, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
