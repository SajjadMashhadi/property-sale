import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export default function ProtectedRoute() {
  const [token] = useLocalStorage("token", null);
  const [userId] = useLocalStorage("userId", null);

  return token && userId ? <Outlet /> : <Navigate to="/login" />;
}
