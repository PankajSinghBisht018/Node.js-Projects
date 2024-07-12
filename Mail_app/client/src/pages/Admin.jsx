import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkRole } from '../utils/roles';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkRole('admin')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the 'admin' role.</p>
    </>
  );
};

export default Admin;
