import { useState, useEffect } from 'react';
import { AuthContext  } from '../contexts/AuthContext';
import { authService } from '../services/auth.service';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadingSubscription = authService.isLoading$.subscribe(setIsLoading);

    return () => {
      loadingSubscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, login: authService.login, logout: authService.logout }}>
      {children}
    </AuthContext.Provider>
  );
};

