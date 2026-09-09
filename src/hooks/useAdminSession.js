import { useCallback, useState } from "react";
import * as adminApi from "../utils/adminApi";

const TOKEN_KEY = "admin_session_token";

const useAdminSession = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await adminApi.login(username, password);
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      return true;
    } catch (err) {
      setError(err.message || "Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    if (token) adminApi.logout(token).catch(() => {});
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, [token]);

  return { token, isAuthenticated: Boolean(token), login, logout, error, isLoading };
};

export default useAdminSession;
