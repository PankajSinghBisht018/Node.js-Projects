import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 'auto', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' ,bgcolor: 'purple', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(128, 0, 128, 0.5)'}}>
      <Typography variant="body2">
        © 2024 Blog-App. All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
