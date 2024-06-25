const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const connectDB = require('./conn/db');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const chatSockets = require('./sockets/chat');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
    }
});

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', messageRoutes);

app.use(express.static(path.join(__dirname, 'public')));


chatSockets(io);

const PORT =5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
