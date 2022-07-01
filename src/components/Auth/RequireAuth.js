import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const RequireAuth = () => {
  const appContext = useAuthContext();
  const location = useLocation();
  console.log(appContext);

  //Si le appcontext contient des UserInfo, alors on dirige le user vers Outlet, sinon on le ramène vers la page de login
  return appContext?.userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
