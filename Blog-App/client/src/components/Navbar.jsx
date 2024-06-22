import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, AddBox, ExitToApp } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'purple', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(128, 0, 128, 0.5)'}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.contrastText' }}>
          BlogApp
        </Typography>
        {!token ? (
          <Button color="inherit" component={Link} to="/auth" startIcon={<AccountCircle />}>
            Login / Signup
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/add-blog" startIcon={<AddBox />}>
              Add Blog
            </Button>
            <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
