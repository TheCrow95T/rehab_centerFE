import { Navigate, Outlet } from "react-router-dom";
import getCookie from "./utilities/getCookie";

type RouteProp = {
    redirectPath: string;
};

const ProtectedRoute = ({ redirectPath }: RouteProp) => {
    if (getCookie("accessToken")) {
        return <Outlet />;
    }
    return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
