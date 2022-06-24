import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const RequireAuth = () => {
  const appContext = useAuthContext();
  const location = useLocation();
  console.log(appContext);

  return appContext?.userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
