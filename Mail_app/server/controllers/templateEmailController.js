const nodemailer = require('nodemailer');
const EmailTemplate = require('../models/EmailTemplate');

const sendEmailTemplate = async (req, res) => {
  const {  htmlContent, recipients,subject,from } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await Promise.all(recipients.map(async (recipient) => {
      let info = await transporter.sendMail({
        from,
        to: recipients.join(','),
        subject: subject,
        html: htmlContent,
      });
      console.log('Message sent: %s', info.messageId);  
      
      
      const emailTemplate = new EmailTemplate({
      subject,
      htmlContent,
      recipient,
      sender: from,
      messageId: info.messageId,
      sentAt: new Date(),
    });
    await emailTemplate.save();
  
    }));

    res.status(200).send({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send emails.', error });
  }
};


const getEmailEvents = async (req, res) => {
  try {
    const emailEvents = await EmailTemplate.find({});
    res.status(200).json(emailEvents);
  } catch (error) {
    console.error('Error fetching email events:', error);
    res.status(500).send({ message: 'Failed to fetch email events.', error });
  }
};

const getCampaignCounts = async (req, res) => {
  try {
    const count = await EmailTemplate.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching campaign counts:', error);
    res.status(500).send({ message: 'Failed to fetch campaign counts.', error });
  }
};

module.exports = { sendEmailTemplate ,getEmailEvents, getCampaignCounts };
