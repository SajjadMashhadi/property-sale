import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

const ProtectedRoute: React.FC = () => {
  const [token] = useLocalStorage<string | null>("token", null);
  const [userId] = useLocalStorage<string | null>("userId", null);

  return token && userId ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
