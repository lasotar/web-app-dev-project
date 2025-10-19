import { createContext, useContext } from 'react';
import type { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
}

export interface AuthContextType {
  isLoading: boolean;
  login: (password: string, username?: string, email?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
