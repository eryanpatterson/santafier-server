const { sendEmail } = require("./mailer");
require('dotenv').config('../.env.local');

async function createGroup(data) {
    const { db } = await connectToDatabase();
    const add = db.collection('groups').insertOne(data);
    const response = db.collection('groups').findOne(
        { email: data.email },
        {projection: {
            _id: 1
        }
    })
    return response;
}

async function addUser(data) {
    const { db } = await connectToDatabase();
    const add = db.collection('users').insertOne(data);
}

async function countGroup(data) {
    const { db } = await connectToDatabase();
    const groupMembers = await db.collection('users').find(
        { groupId: data.groupId }
    ).toArray();
    console.log(groupMembers)
    const { groupSize } = await db.collection('groups').findOne(
        { _id: ObjectId(data.groupId) },
        { projection: {
            _id: 0, groupSize: 1
        }}
    )
    if (groupMembers.length >= Number(groupSize)) {
        console.log("Same value!")
        for (let i = groupMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const holder = groupMembers[i];
            groupMembers[i] = groupMembers[j];
            groupMembers[j] = holder;
        }
        console.log(groupMembers)
        for (let i = groupMembers.length; i > 0; i--) {
            let mailData;
            if (i === 1) {
                mailData = {
                    email: groupMembers[0].email,
                    giftee: groupMembers[groupMembers.length-1].firstName + ' ' + groupMembers[groupMembers.length-1].lastName,
                }
                sendEmail(mailData);
            } else {
                mailData = {
                    email: groupMembers[i-1].email,
                    giftee: groupMembers[i-2].firstName + ' ' + groupMembers[i-2].lastName
                }
                sendEmail(mailData);
            }
        }
    }
}

async function getMessage(db) {
    const messages = db.collection('messages').find({}).toArray();
    return messages;
}

module.exports = {
    createGroup,
    addUser,
    countGroup,
    getMessage
}