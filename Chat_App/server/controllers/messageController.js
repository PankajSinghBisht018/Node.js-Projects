const Message = require('../models/Message');

const getMessages = async (req, res) => {
  const { user } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.email, receiver: user },
        { sender: user, receiver: req.user.email }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const addMessage = async (req, res) => {
  const { receiver, message } = req.body;
  try {
    const newMessage = new Message({
      sender: req.user.email,
      receiver,
      message
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({ sender: req.user.email });
    res.json({ msg: 'All messages deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { getMessages, addMessage, deleteAllMessages };
