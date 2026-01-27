import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { LeagueOfficial, LeagueOfficialSignupData, LeagueOfficialLoginData } from '../models/types';

interface LeagueOfficialAuthContextType {
  isAuthenticated: boolean;
  official: LeagueOfficial | null;
  login: (data: LeagueOfficialLoginData) => Promise<{ success: boolean; error?: string }>;
  signup: (data: LeagueOfficialSignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const LeagueOfficialAuthContext = createContext<LeagueOfficialAuthContextType | undefined>(undefined);

export const useLeagueOfficialAuth = () => {
  const context = useContext(LeagueOfficialAuthContext);
  if (context === undefined) {
    throw new Error('useLeagueOfficialAuth must be used within a LeagueOfficialAuthProvider');
  }
  return context;
};

interface LeagueOfficialAuthProviderProps {
  children: ReactNode;
}

export const LeagueOfficialAuthProvider = ({ children }: LeagueOfficialAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [official, setOfficial] = useState<LeagueOfficial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Get official profile
          const { data: officialData } = await supabase
            .from('league_officials')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (officialData) {
            setOfficial(officialData);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: officialData } = await supabase
          .from('league_officials')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (officialData) {
          setOfficial(officialData);
          setIsAuthenticated(true);
        }
      } else if (event === 'SIGNED_OUT') {
        setOfficial(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (data: LeagueOfficialSignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      if (authData.user) {
        // Create official profile
        const { error: profileError } = await supabase
          .from('league_officials')
          .insert([{
            id: authData.user.id,
            email: data.email,
            name: data.name,
            position: data.position,
            phone: data.phone,
          }]);

        if (profileError) {
          return { success: false, error: profileError.message };
        }

        return { success: true };
      }

      return { success: false, error: 'Failed to create account' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LeagueOfficialLoginData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setOfficial(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <LeagueOfficialAuthContext.Provider value={{
      isAuthenticated,
      official,
      login,
      signup,
      logout,
      loading
    }}>
      {children}
    </LeagueOfficialAuthContext.Provider>
  );
};