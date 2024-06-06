const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendMail = async function(formData) {
    const { name, message } = formData;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: 'demoid0077@gmail.com',
            pass: 'hseujedpisnhmezx'
        }
    });

    const htmlTemplatePath = path.join(__dirname, 'emailTemplate.html');
    let htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8');

    htmlTemplate = htmlTemplate.replace('{{name}}', name).replace('{{message}}', message);

    let messageSubmit = await transporter.sendMail({
        from: 'demoid0077@gmail.com',
        to: "pankajsbisht88@gmail.com",  
        subject: 'Exclusive Offer: 50% Discount on All Items!',
        html: htmlTemplate
    });

    console.log("Message has been sent: %s", messageSubmit.messageId);
};

module.exports = sendMail;
