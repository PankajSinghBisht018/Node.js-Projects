const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const addMessage = async (req, res) => {
  const { user, message } = req.body;
  try {
    const newMessage = new Message({ user, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({ msg: 'All messages deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { getMessages, addMessage, deleteAllMessages };
