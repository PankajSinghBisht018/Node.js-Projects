import React from 'react';
import { Typography, AppBar, Container } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0, backgroundColor: 'lightblue', padding: '10px' }}>
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          © 2024 URL Shortener
        </Typography>
      </Container>
    </AppBar>
  );
};

export default Footer;
