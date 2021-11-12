const nodemailer = require("nodemailer");
require('dotenv').config('../.env.local');

const transporter = nodemailer.createTransport({
    host: 'host',
    port: 25,
    secure : false, // true for 465, false for other ports
    auth: {
        user: 'user',
        pass: 'password'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
});

async function verifyEmail(member, group, url) {
    const mailOptions = {
        from: 'Head Elf',
        to: member.email,
        subject: 'Verify Your Email',
        html: 
            `
            <h2>Verify your Email</h2>
            <h3>Hi, ${member.name}, </h3> 
            <p>${group.admin} has added you to their Secret Santa group, ${group.name}! Confirm your email
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

function santaEmail(group) {
    const { members, exchangeDate, spendingLimit } = group;
    notifyAdmin(group);
    for (let i = members.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const holder = members[i];
    members[i] = members[j];
    members[j] = holder;
    }
    for (let i = members.length; i > 0; i--) {
        let mailData;
        if (i === 1) {
            mailData = {
                name: members[0].name,
                email: members[0].email,
                giftee: members[members.length-1].name,
                address: members[members.length-1].address
            }
            sendEmail(mailData, exchangeDate, spendingLimit);
        } else {
            mailData = {
                name: members[i-1].name,
                email: members[i-1].email,
                giftee: members[i-2].name,
                address: members[i-2].address
            }
            sendEmail(mailData, exchangeDate, spendingLimit);
        }
    }
}

function notifyAdmin(group) {
    const mailOptions = {
        from: 'headelf@secret-santafier.com',
        to: group.adminEmail,
        subject: 'Your Group Has Confirmed!',
        html: `<h2>Hi, ${group.admin}!</h2> <p>Your Secret Santa group ${group.name} is ready to gift! All members have verified and entered their mailing address.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function sendEmail(data, exchangeDate, spendingLimit) {
    const mailOptions = {
        from: 'headelf@secret-santafier.com',
        to: data.email,
        subject: 'Secret Santa Result',
        html: `<h2>Congrats, ${data.name}!</h2> <p>You are ${data.giftee}'s Secret Santa!</p>
                <p>Mail their gift to ${data.address} or bring it to your in-person gift exchange 
                on ${exchangeDate}. Be sure to stay within the ${spendingLimit} dollar spending limit!`
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