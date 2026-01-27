import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { hasValidConfig } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface User {
  id: string;
  username: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check configuration on mount
  useEffect(() => {
    if (!hasValidConfig()) {
      console.error('Invalid Supabase configuration');
      toast.error('Database configuration error. Please check environment variables.');
    }
  }, []);

  useEffect(() => {
    // Check for existing admin session in localStorage
    const checkSession = async () => {
      try {
        const adminSession = localStorage.getItem('adminSession');
        if (adminSession) {
          const userData = JSON.parse(adminSession);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!hasValidConfig()) {
        toast.error('Database configuration error');
        return false;
      }
      
      // Check hardcoded admin credentials
      const adminCredentials = [
        { username: 'admin', password: 'password', role: 'admin' },
        { username: 'fkfadmin', password: 'aldai2024', role: 'admin' },
        { username: 'secretary', password: 'secretary123', role: 'admin' }
      ];
      
      const matchedCredential = adminCredentials.find(
        cred => cred.username === username && cred.password === password
      );
      
      if (matchedCredential) {
        const user = {
          id: `admin-${matchedCredential.username}`,
          username: matchedCredential.username,
          role: matchedCredential.role
        };
        
        setUser(user);
        setIsAuthenticated(true);
        
        // Store session in localStorage
        localStorage.setItem('adminSession', JSON.stringify(user));
        toast.success('Admin login successful');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear local session
      localStorage.removeItem('adminSession');
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};