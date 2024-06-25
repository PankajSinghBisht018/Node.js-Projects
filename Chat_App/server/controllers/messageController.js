const Message = require('../models/Message');

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const addMessage = async (messageData) => {
    try {
        const message = new Message(messageData);
        await message.save();
    } catch (err) {
        console.error(err);
    }
};

module.exports = {getMessages,addMessage};
