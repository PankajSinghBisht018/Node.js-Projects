import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const UrlList = ({ urls }) => {
  const handleRedirect = (shortUrl) => {
    window.open(`http://localhost:5000/api/url/${shortUrl}`, '_blank');
  };

  return (
    <Paper elevation={3} style={{ marginTop: '20px', padding: '20px', maxHeight: '400px', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Shortened URLs
      </Typography>
      <List>
        {urls.map((url) => (
          <ListItem key={url._id} button onClick={() => handleRedirect(url.shortUrl)}>
            <ListItemText
              primary={`http://localhost:5000/api/url/${url.shortUrl}`}
              secondary={`Original URL: ${url.originalUrl}`}
            />
            <a href={`http://localhost:5000/api/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">
              Visit
            </a>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UrlList;
