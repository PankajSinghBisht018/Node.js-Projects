const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendMail = async function(formData, db) {
    const { name, message, email, cc, bcc } = formData; 
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

        const messageSubmit = await transporter.sendMail({
            from: 'demoid0077@gmail.com',
            to: email,
            cc: cc,
            bcc: bcc,
            subject: 'Exclusive Offer: 50% Discount on All Items!',
            html: htmlTemplate,
            attachments: [
                { filename: 'logo.png', path: path.join(__dirname, 'img/logo.png'),
                    cid: 'logo' },
                { filename: 'product_1.png', path: path.join(__dirname, 'img/product_1.png'),
                     cid: 'product_1' },
                { filename: 'product_2.png', path: path.join(__dirname, 'img/product_2.png'),
                     cid: 'product_2' },
                { filename: 'product_3.png', path: path.join(__dirname, 'img/product_3.png'), 
                    cid: 'product_3' },
                { filename: 'product_4.png', path: path.join(__dirname, 'img/product_4.png'), 
                    cid: 'product_4' },
                { filename: 'black-facebook.png', path: path.join(__dirname, 'img/black-facebook.png'), 
                    cid: 'black-facebook' },
                { filename: 'black-twitter.png', path: path.join(__dirname, 'img/black-twitter.png'), 
                    cid: 'black-twitter' },
                { filename: 'black-linkedin.png', path: path.join(__dirname, 'img/black-linkedin.png'),
                    cid: 'black-linkedin' },
                { filename: 'black-instagram.png', path: path.join(__dirname, 'img/black-instagram.png'),    cid: 'black-instagram' }
            ]
        });
        console.log("Message has been sent: %s", messageSubmit.messageId);
        
        await db.collection('form_data').insertOne(formData);
        console.log('Form data saved to MongoDB');

};

module.exports = sendMail;
