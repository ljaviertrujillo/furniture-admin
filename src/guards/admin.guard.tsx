import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes } from "../models";

export default function AdminGuard() {
    const userState = useSelector((store: AppStore) => store.user);
    return !!userState.name ? (
        <Outlet />
      ) : (
        <Navigate replace to={PrivateRoutes.HOME} />
      );
}