import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/campaign" />;
  }

  const userRoles = user.publicMetadata.roles || [];
  const hasAccess = roles.some(role => userRoles.includes(role));

  return hasAccess ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
