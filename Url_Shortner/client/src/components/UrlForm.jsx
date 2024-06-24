import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

const UrlForm = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
    setUrl('');
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '10px' }}
          >
            Shorten URL
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default UrlForm;
