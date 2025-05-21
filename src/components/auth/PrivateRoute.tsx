
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { userDataService } from '@/services/userDataService';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const isFirstTimeUser = user ? userDataService.isFirstTimeUser() : false;
  
  useEffect(() => {
    // For logged-in users, check if they should see the welcome page
    if (isAuthenticated && user) {
      const shouldSeeWelcome = userDataService.isFirstTimeUser();
      
      // If they should see welcome but aren't on welcome page, redirect
      if (shouldSeeWelcome && location.pathname !== '/dashboard/welcome') {
        // We'll handle this in the return statement
      }
    }
    
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [isAuthenticated, user, location.pathname]);
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // For first-time users, redirect to welcome page (except if they're already there)
  if (isFirstTimeUser && location.pathname !== '/dashboard/welcome') {
    return <Navigate to="/dashboard/welcome" replace />;
  }
  
  // Otherwise render the protected component
  return <>{children}</>;
};

export default PrivateRoute;
