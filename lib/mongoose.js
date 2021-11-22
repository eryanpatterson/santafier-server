const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { verifyEmail, santaEmail } = require('./mailer')
require('dotenv').config('../.env.local');


    // group will be an object, members an array
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('DB connection successful');
    }
});

const tokenSchema = new mongoose.Schema({
    token: String,
    user: String
});

const Token = new mongoose.model('Token', tokenSchema);

const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    verified: Boolean
});
    
const groupSchema = new mongoose.Schema({
    name: String,
    admin: String,
    adminEmail: String,
    exchangeDate: String,
    spendLimit: Number,
    address: Boolean,
    members: [memberSchema]
});
const Group = mongoose.model('Group', groupSchema);
const Member = mongoose.model('Member', memberSchema);

async function group({ group, members }) {
    console.log(group);
    const newGroup = new Group({
        name: group.name,
        admin: group.admin,
        adminEmail: group.adminEmail,
        exchangeDate: group.exchangeDate,
        spendLimit: group.spendLimit,
        useAddress: group.useAddress
    });

    members.forEach( member => {
        newGroup.members.push( new Member({
            name: member.name,
            email: member.email,
            verified: false
        }));
    });


    newGroup.members.forEach( member => {
        const groupMember = {
            member: member,
            group: newGroup.name
        }
        const token = jwt.sign(groupMember.toJSON(), process.env.VERIFY_TOKEN_SECRET);
        const newToken = new Token({
            token: token,
            user: member.name
        });
        newToken.save();
        const url = `https://secretsantafier.com/#/group?token=${token}`;
        verifyEmail(member, newGroup, url);
    });

    await newGroup.save();
};

async function createAddressToken(member) {
    const token = jwt.sign(member, process.env.ADDRESS_TOKEN_SECRET);
    const addressToken = new Token({
        token: token,
        user: member.name
    });
    await addressToken.save();
    return addressToken;
}

async function verify(member) {
    const filter = { "members.name": member.name};
    const update = {"$set": {
        "members.$.verified" : true
    }};
    const group = await Group.findOneAndUpdate(filter, update);
}

async function address(member, address) {
    const filter = { "members.name": member.name };
    const update = { "$set": {
        "members.$.address" : address }
    };
    await Group.findOneAndUpdate(filter, update);
}

async function checkToken(token) {
    const filter = { "token": token };
    const result = await Token.findOne(filter);
    return result;
}

async function deleteToken(token) {
    const filter = { "token": token };
    await Token.findOneAndDelete(filter);
}

async function checkGroup(member) {
    const filter = { "name": member.group };
    const group = await Group.findOne(filter);
    let result = true;
    group.members.forEach(member => {
        let value;
        if (group.useAddress) {
            value = member.address
        } else {
            value = member.verified;
        }
        if (!value) {
            result = false;
            return
        }
    })
    result ? santaEmail(group) : null;
}

module.exports = { group, verify, address, checkToken, deleteToken, checkGroup, createAddressToken };