const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { getMessages, deleteAllMessages } = require('../controllers/messageController');

router.get('/messages', verifyToken, getMessages);
router.delete('/messages', verifyToken, deleteAllMessages);

module.exports = router;
