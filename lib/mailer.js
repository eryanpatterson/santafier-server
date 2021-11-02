const nodemailer = require("nodemailer");
require('dotenv').config('../.env.local');

async function verifyEmail(email, admin, groupName, url) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'Head Elf',
        to: email,
        subject: 'Verify Your Email',
        html: 
            `
            <h2>Verify your Email</h2>
            <p>${admin} has added you to their Secret Santa group, ${groupName}! Confirm your email
            by clicking the link below.</p>
            <a href="${url}">Verify Email</a>
            `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function santaEmail(data) {
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

module.exports = { verifyEmail, santaEmail }