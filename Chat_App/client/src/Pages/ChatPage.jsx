import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Button, Avatar, Typography, TextField, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { Logout, Send } from '@mui/icons-material';

function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
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
    if (message.trim() && activeChat) {
      const newMessage = { sender: email, receiver: activeChat, message };
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

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-red-500">
      <div className="w-1/4 bg-gray-800 text-white flex flex-col">
        <Typography variant="h6" className="p-4">Online Users</Typography>
        <List className="flex-1 overflow-y-auto">
          {users
            .filter(user => user !== email)
            .map((user) => (
              <ListItem
                key={user}
                button
                selected={activeChat === user}
                onClick={() => setActiveChat(user)}
                className="hover:bg-gray-700"
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'green' }}>
                    {user[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={user}
                  secondary={
                    <span className={`inline-block w-2 h-2 rounded-full ${users.includes(user) ? 'bg-green-500' : 'bg-gray-500'}`} />
                  }
                />
              </ListItem>
            ))}
        </List>
        <div className="p-4 flex justify-between">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Logout />}
            onClick={logout}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAllMessages}
            startIcon={<FaTrash />}
          >
            Delete All
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-gray-900 text-white flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages
            .filter((msg) => 
              (msg.sender === email && msg.receiver === activeChat) || 
              (msg.sender === activeChat && msg.receiver === email)
            )
            .map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.sender === email ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`p-2 rounded-lg ${msg.sender === email ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                  <Typography variant="subtitle1" className="font-bold">{msg.sender}:</Typography>
                  <Typography>{msg.message}</Typography>
                </div>
              </div>
            ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 flex space-x-2">
          <TextField
            variant="outlined"
            className="flex-1 bg-gray-800"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="ml-2"
            startIcon={<Send />}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
