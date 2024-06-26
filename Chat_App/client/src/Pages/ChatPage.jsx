import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Box, Button, Input, VStack, HStack, Heading, Avatar, Text, InputGroup, InputRightElement, } from '@chakra-ui/react';
import { FaTrash, FaSearch } from 'react-icons/fa';

function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const socket = io('http://localhost:8000', {
    auth: { token }
  });

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/messages', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    socket.emit('join', email);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('user-joined', (userEmail) => {
      setUsers((prevUsers) => [...prevUsers, userEmail]);
    });

    socket.on('user-left', (userEmail) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user !== userEmail));
    });

    socket.on('online-users', (onlineUsers) => {
      setUsers(onlineUsers);
    });

    return () => {
      socket.off('message');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('online-users');
    };
  }, [token, navigate]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { user: email, message };
      socket.emit('chat-message', newMessage);
      setMessage('');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  const handleDeleteAllMessages = async () => {
    try {
      await axios.delete('http://localhost:8000/api/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Box maxW="800px" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" bg="rgba(0, 0, 0, 0.5)">
      <Heading size="lg" mb={4} color="white">Chat Room</Heading>
      <VStack spacing={4} align="stretch">
        <VStack align="start">
          <Heading size="md" color="white">Welcome, {email}!</Heading>
          <Text fontSize="sm" color="gray.300">Online Users:</Text>
          {users.map((user) => (
            <HStack key={user} alignItems="center">
              <Avatar size="sm" name={user} />
              <Text color="white">{user}</Text>
            </HStack>
          ))}
        </VStack>
        <Box borderWidth={1} borderRadius="lg" p={4} minHeight="400px" maxHeight="400px" overflowY="auto">
          {messages.map((msg, index) => (
            <Box key={index} borderWidth={1} borderRadius="lg" p={2} mb={2}>
              <Text fontWeight="bold" color="white">{msg.user}</Text>
              <Text color="white">{msg.message}</Text>
            </Box>
          ))}
        </Box>
        <form onSubmit={sendMessage}>
          <InputGroup>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              size="md"
              flex="1"
              bg="gray.800"
              color="white"
              _placeholder={{ color: 'gray.400' }}
              _focus={{ bg: 'gray.700' }}
            />
            <InputRightElement width="4.5rem">
              <Button type="submit" colorScheme="blue" size="sm">Send</Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </VStack>
      <HStack mt={4} justify="space-between">
        <Button colorScheme="red" onClick={logout}>Logout</Button>
        <Button colorScheme="blue" leftIcon={<FaTrash />} onClick={handleDeleteAllMessages}>Delete All Messages</Button>
        <Input
          value={search}
          onChange={handleSearch}
          placeholder="Search users..."
          size="md"
          flex="1"
          maxW="md"
          bg="gray.800"
          color="white"
          _placeholder={{ color: 'gray.400' }}
          _focus={{ bg: 'gray.700' }}
        />
        <Button colorScheme="blue" leftIcon={<FaSearch />}>Search</Button>
      </HStack>
    </Box>
  );
}

export default ChatPage;
