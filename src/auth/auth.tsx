import { useContext, useEffect } from "react";
import AuthContext from "./context";
import { useLocalStorage } from "usehooks-ts";

export const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [token, setToken] = useLocalStorage("token");
  const [userId, setUserId] = useLocalStorage("userId");

  //   axios.defaults.headers.common["token"] = token;

  //   delete axios.defaults.headers.common["token"];

  function login(token: string, userId: string) {
    setToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
  }

  function logout() {
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (!token || !userId) {
      logout();
    } else {
      setToken(token);
      setUserId(userId);
    }
  }, []);

  return { login, logout, isAuthenticated };
};
