import { Navigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import { useEffect, useState, type ReactNode } from "react";
import { createRequest } from "../services/api.service";
import type { AjaxError } from "rxjs/ajax";

interface RoleResponse {
    role: string
}

interface ProtectedRouteProps {
    minRole: string;
    children: ReactNode
}

export const ProtectedRoute = ({ minRole, children } : ProtectedRouteProps) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("validating crdentials...")
        const subscription = createRequest<RoleResponse>("GET", "Auth/role").subscribe({
            next: (response: RoleResponse) => {
                let hasPermission = false;
                switch ( minRole ) {
                    case "User":
                        hasPermission = true;
                        console.log("letting user in...")
                        break;
                    case "Manager":
                        if (response.role === "Admin" || response.role === "Manager")
                        {
                            hasPermission = true;
                        }
                        break;
                    case "Admin":
                        if (response.role === "Admin")
                        {
                            hasPermission = true;
                        }
                        break;
                }
                setIsAuth(hasPermission);
                setLoading(false);
            },
            error: (error: AjaxError) => {
                if (error.status !== 401)
                {
                    console.error(error)
                }
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [minRole])

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuth 
        ? <>{children}</> 
        : <Navigate to="/login" />
        ;
}
