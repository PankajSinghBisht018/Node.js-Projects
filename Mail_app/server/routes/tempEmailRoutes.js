const express = require('express');
const { sendEmailTemplate,getEmailEvents,getCampaignCounts  } = require('../controllers/templateEmailController');


const router = express.Router();

router.post('/temp-email', sendEmailTemplate);
router.get('/email-events', getEmailEvents);
router.get('/campaign-counts', getCampaignCounts);

module.exports = router;
