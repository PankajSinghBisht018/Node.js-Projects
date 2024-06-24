import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'lightBlue' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'royalBlue' }}>
          URL Shortener
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
