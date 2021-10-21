const nodemailer = require("nodemailer");
require('dotenv').config('../.env.local');

async function sendEmail(data) {
    console.log(process.env.EMAIL_PASSWORD)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'headelf@secret-santafier.com',
        to: data.email,
        subject: 'Secret Santa Result',
        html: `<h2>Congrats!</h2> <p>You are ${data.giftee}'s Secret Santa!</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports.sendEmail = sendEmail