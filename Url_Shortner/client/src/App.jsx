import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Paper } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';

const App = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/url');
      if (response.ok) {
        const data = await response.json();
        setUrls(data);
      } else {
        console.error('Failed to fetch URLs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleSubmit = async (url) => {
    try {
      const response = await fetch('http://localhost:5000/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });
      if (response.ok) {
        const data = await response.json();
        setUrls([...urls, data]);
      } else {
        console.error('Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '60px' }}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f0f8ff' }}>
          <UrlForm onSubmit={handleSubmit} />
          <UrlList urls={urls} />
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default App;
