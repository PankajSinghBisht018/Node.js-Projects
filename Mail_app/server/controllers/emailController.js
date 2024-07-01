const nodemailer = require('nodemailer');
const Email = require('../models/Email');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (req, res) => {
  const { subject, body, sender, recipient, cc, bcc, attachments } = req.body;

  try {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      cc,
      bcc,
      subject,
      html: body,
      attachments,
    });

    const newEmail = new Email({
      subject,
      body,
      sender,
      recipient,
      cc,
      bcc,
      attachments,
    });
    await newEmail.save();

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

module.exports = {
  sendEmail,
};
