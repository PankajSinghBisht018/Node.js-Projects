import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { loginUser, registerUser } from '../api';
import { TextField, Button, Container, Typography, Paper, Link as MuiLink, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '', 
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (isLogin) {
          const response = await loginUser({ email: values.email, password: values.password });
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          await registerUser(values);
          alert('User registered successfully. Please log in.');
          setIsLogin(true);
        }
      } catch (error) {
        console.error('Error logging in or registering user', error);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/036/883/577/small_2x/ai-generated-the-beautiful-sunset-view-with-the-blue-sky-and-clouds-in-summer-photo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs" sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 2, padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Signup'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              margin="normal"
            />
          )}
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            {isLogin ? 'Login' : 'Signup'}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <MuiLink component="button" variant="body2" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up here' : 'Login here'}
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default Auth;
