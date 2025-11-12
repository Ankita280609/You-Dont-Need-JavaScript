import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a loading spinner or message while auth state is being checked
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!user) {
    // If user is not logged in, redirect to login page
    // 'replace' stops the user from going "back" to the protected route
    // 'state' remembers where the user was trying to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If user is logged in, show the child components (the protected page)
  return children;
};

export default ProtectedRoute;