const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyEmail } = require('./mailer')
require('dotenv').config('../.env.local');


    // group will be an object, members an array
mongoose.connect(process.env.MONGO_URI);

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
    pwd: String,
    members: [memberSchema]
});
const Group = mongoose.model('Group', groupSchema);
const Member = mongoose.model('Member', memberSchema);
async function group({ group, members }) {
    
    const newGroup = new Group({
        name: group.name,
        admin: group.admin,
        adminEmail: group.adminEmail,
        pwd: bcrypt.hash(group.pwd, 10, function(err, hash) {
            if (err) {
                throw new Error({message: err})
            } else {
            return hash
            };
        })
    });

    members.forEach( member => {
        newGroup.members.push( new Member({
            name: member.name,
            email: member.email,
            verified: false
        }));
    });

    console.log("Back end: " + group.adminName);

    newGroup.members.forEach( member => {
        const token = jwt.sign(member.toJSON(), process.env.VERIFY_TOKEN_SECRET);
        const newToken = new Token({
            token: token,
            user: member.name
        });
        newToken.save();
        const url = `http://localhost:3000/group?token=${token}`;
        verifyEmail(member, newGroup, url);
    });

    await newGroup.save();
};

async function verify(member) {
    console.log(member.name);
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

module.exports = { group, verify, address, checkToken, deleteToken };