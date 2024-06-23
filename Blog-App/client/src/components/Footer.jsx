import React from 'react';
import { Typography, AppBar, Toolbar, Container } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, bgcolor: 'rgba(128, 0, 128, 0.5)', backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="md">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            © 2024 Blog-App. All rights reserved
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
