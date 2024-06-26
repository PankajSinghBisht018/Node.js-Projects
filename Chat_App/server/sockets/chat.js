const Message = require('../models/Message');

module.exports = (io) => {
  const users = new Map();

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', (email) => {
      socket.email = email;
      users.set(socket.id, email);
      console.log(`User joined: ${email}`);
      io.emit('user-joined', email);
      io.emit('online-users', Array.from(users.values()));
    });

    socket.on('chat-message', async (msg) => {
      io.emit('message', msg);
      try {
        await Message.create(msg);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      if (socket.email) {
        users.delete(socket.id);
        console.log(`User left: ${socket.email}`);
        io.emit('user-left', socket.email);
        io.emit('online-users', Array.from(users.values()));
      }
    });
  });
};
