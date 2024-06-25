const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getMessages } = require('../controllers/messageController');
const { getUser } = require('../controllers/userController');

const router = express.Router();

router.get('/messages', auth, getMessages);
router.get('/user', auth, getUser);

module.exports = router;
