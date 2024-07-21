import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', email);
      navigate('/chat');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: '100%' }} className="bg-white shadow-lg rounded-lg">
            <div className="flex justify-center mb-4">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>   
             
            </div>
          <Typography component="h1" variant="h5" sx={{textAlign:'center'}}>
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Box mt={2} textAlign="center">
                <Button variant="text" color="primary" onClick={() => navigate('/forgot-password')}>
                  Forgot password?
                </Button>
                <Box mt={1}>
                  <Button variant="text" color="primary" onClick={() => navigate('/signup')}>
                    Don't have an account? Sign Up
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
