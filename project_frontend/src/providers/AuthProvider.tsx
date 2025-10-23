import { useState, useEffect } from 'react';
import { AuthContext  } from '../contexts/AuthContext';
import { authService } from '../services/auth.service';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={{ login: authService.login, logout: authService.logout }}>
      {children}
    </AuthContext.Provider>
  );
};

