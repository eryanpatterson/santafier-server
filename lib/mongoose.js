const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyEmail } = require('./mailer')
require('dotenv').config('../.env.local');


    // group will be an object, members an array
mongoose.connect(process.env.MONGO_URI);
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
        const token = jwt.sign(member.toJSON(), process.env.TOKEN_SECRET);
        const url = `http://localhost:3000/group?token=${token}`;
        verifyEmail(member.email, newGroup.admin, newGroup.name, url);
    });

    await newGroup.save();
};

async function verify(member) {
    const filter = { 'member.name': member.name };
    await Group.findOne(filter).then(doc => {
        member = doc.members.name(member.name);
        member["verified"] = true;
        doc.save();
    }).catch(err => {
        console.log(err);
    });
}

async function address(member, address) {
    const filter = { name: member.name };
    const update = { address: address }
    await Member.findOneAndUpdate(filter, update);
}

module.exports = { group, verify, address };