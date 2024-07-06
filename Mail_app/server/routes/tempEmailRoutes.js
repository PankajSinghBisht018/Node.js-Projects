const express = require('express');
const { sendEmailTemplate } = require('../controllers/tempEmailController');

const router = express.Router();

router.post('/temp-email', sendEmailTemplate);

module.exports = router;
