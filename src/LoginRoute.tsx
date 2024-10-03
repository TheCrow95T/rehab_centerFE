import { Navigate, Outlet } from "react-router-dom";
import getCookie from "./utilities/getCookie";

type RouteProp = {
    redirectPath: string;
};

const LoginRoute = ({ redirectPath }: RouteProp) => {
    if (getCookie("accessToken")) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default LoginRoute;
