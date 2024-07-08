const nodemailer = require('nodemailer');

const sendEmailTemplate = async (req, res) => {
  const {  htmlContent, recipients,subject } = req.body;

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
        from: 'demoid0077@gmail.com',
        to: recipients.join(','),
        subject: subject,
        html: htmlContent,
      });
      console.log('Message sent: %s', info.messageId);
    }));

    res.status(200).send({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send emails.', error });
  }
};

module.exports = { sendEmailTemplate };
