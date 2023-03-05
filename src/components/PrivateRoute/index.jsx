// import { useAuth } from "@/hooks/useAuth"
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = ({ redirect = "/" }) => {
  const { user } = useAuth();
  const { pathname, state } = useLocation();
  const stateRedirect = {
    redirect: pathname,
  };

  if (!user)
    return <Navigate to={state?.redirect || redirect} state={stateRedirect} />;

  return <Outlet />;
};
