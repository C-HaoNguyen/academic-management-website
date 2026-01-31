import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isLoggedIn } from "../utils/AuthUtils";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;