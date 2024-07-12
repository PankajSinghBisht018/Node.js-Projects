import { useAuth } from '@clerk/clerk-react';

export const checkRole = (role) => {
  const { sessionClaims } = useAuth();
  return sessionClaims?.metadata?.role === role;
};
