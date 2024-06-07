const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendMail = async function(formData) {
    const { name, message, to, cc, bcc } = formData;
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

    let messageSubmit;


        messageSubmit = await transporter.sendMail({
            from: 'demoid0077@gmail.com',
            to: to,  
            cc: cc,
            bcc: bcc,
            subject: 'Exclusive Offer: 50% Discount on All Items!',
            html: htmlTemplate,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname, 'logo.png'),
                    cid: 'logo' 
                },
                {
                    filename: 'product_1.png',
                    path: path.join(__dirname, 'product_1.png'),
                    cid: 'product_1' 
                },
                {
                    filename: 'product_2.png',
                    path: path.join(__dirname, 'product_2.png'),
                    cid: 'product_2' 
                },
               
            ]
        });

        console.log("Message has been sent: %s", messageSubmit.messageId);
};

module.exports = sendMail;
