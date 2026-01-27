import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLeagueOfficialAuth } from '../../contexts/LeagueOfficialAuthContext';

interface LeagueOfficialProtectedRouteProps {
  children: React.ReactNode;
}

const LeagueOfficialProtectedRoute: React.FC<LeagueOfficialProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useLeagueOfficialAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-qatar-gold"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/officials/login" replace />;
  }

  return <>{children}</>;
};

export default LeagueOfficialProtectedRoute;