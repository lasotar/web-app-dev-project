import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuth(localStorage.getItem('isAuth') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = () => {
        setIsAuth(true);
        localStorage.setItem('isAuth', 'true');
    }

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('isAuth');
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
