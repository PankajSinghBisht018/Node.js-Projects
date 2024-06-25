const { addMessage } = require('../controllers/messageController');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('join', (username) => {
            socket.broadcast.emit('New User Joined', username);
        });

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
            addMessage({ user: msg.user, message: msg.message });
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
