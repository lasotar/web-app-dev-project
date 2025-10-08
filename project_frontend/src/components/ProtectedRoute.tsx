import { Navigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuth } = UseAuth();

    console.log("ProtectedRoute: ", isAuth);
    return isAuth 
        ? <>{children}</> 
        : <Navigate to="/login" />
        ;
}
