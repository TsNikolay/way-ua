import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const PrivateRoute = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
