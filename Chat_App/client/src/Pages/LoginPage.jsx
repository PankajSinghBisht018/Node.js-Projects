import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast, VStack } from '@chakra-ui/react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', email);
      navigate('/chat');
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast({ title: "Login failed", description: err.response.data.message || "Server error", status: "error", duration: 5000, isClosable: true,
        });
      } else {
        toast({ title: "Login failed", description: " server is offline", status: "error", duration: 5000, isClosable: true,
        });
      }
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', email);
      navigate('/chat');
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast({ title: "Signup failed", description: err.response.data.message || "Server error", status: "error", duration: 5000, isClosable: true,
        });
      } else {
        toast({ title: "Signup failed", description: " server is offline", status: "error", duration: 5000, isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" bg="rgba(0,0,0,0.7)" color="black" 
    >
      <VStack spacing={4}>
        <Heading mb={6} color="black">Welcome to Chat App</Heading>
        <FormControl id="loginEmail" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} bg="rgba(255,255,255,0.1)"  color="white"
          />
        </FormControl>
        <FormControl id="loginPassword" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} bg="rgba(255,255,255,0.1)"  color="white" 
          />
        </FormControl>
        <Button colorScheme="blue" mb={2} onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outline" colorScheme="blue" onClick={handleSignup}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
}

export default LoginPage;
