const nodemailer = require('nodemailer');

const sendMail = async function(formData) {
    const { name, email, message } = formData;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: 'demoid0077@gmail.com',
            pass: 'hseujedpisnhmezx'
        }
    });

        let messageSubmit = await transporter.sendMail({
            from: 'demoid0077@gmail.com',
            to: 'pankajsbisht88@gmail.com',
            subject: 'Form submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `<p><b>Name:</b> ${name}</p>
                   <p><b>Email:</b> ${email}</p>
                   <p><b>Message:</b> ${message}</p>`
        });

        console.log("Message has been sent: %s", messageSubmit.messageId);

    
};

module.exports = sendMail;
