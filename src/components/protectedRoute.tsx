import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export default function ProtectedRoute() {
  const [token] = useLocalStorage("token", null);

  return token ? <Outlet /> : <Navigate to="/login" />;
}
