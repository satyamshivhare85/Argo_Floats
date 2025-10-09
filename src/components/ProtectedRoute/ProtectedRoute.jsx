import React from 'react';
import { useAuth } from '../../context/AuthContextm/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back there after they log in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;