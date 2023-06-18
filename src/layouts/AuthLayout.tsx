import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthLayout = () => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
export default AuthLayout;
