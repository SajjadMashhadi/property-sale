import { useEffect } from "react";
import { api } from "./axios";
import { useAuth } from "../auth/auth";

const Interceptor = ({ children }) => {
  const { logout } = useAuth();

  useEffect(() => {
    api.interceptors.response.use(null, (error) => {
      if (error.status == 401) {
        console.log("logging out 2");
        logout();
      }
      return Promise.reject(error);
    });
  }, []);
  return children;
};

export default Interceptor;
