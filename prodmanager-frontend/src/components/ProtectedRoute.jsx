import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/api';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const location = useLocation();
  const isLoggedIn = isAuthenticated();
  const user = getUser();

  if (!isLoggedIn) {
    // Redirect to login with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    // Redirect to products if not admin
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default ProtectedRoute; 