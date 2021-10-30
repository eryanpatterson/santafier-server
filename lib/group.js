const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config('../.env.local');

async function group({ group, members }) {
    // group will be an object, members an array
    await mongoose.connect(process.env.MONGO_URI);
    const memberSchema = new mongoose.Schema({
        name: String,
        email: String,
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

    const newGroup = new Group({
        name: group.name,
        admin: group.adminName,
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
        newGroup.members.push({
            name: member.name,
            email: member.email
        });
    });

    await newGroup.save();

    const response = await Group.find({ name: group.name }, '_id', (err, docs) => {
        if (err) { throw new Error({message: err}) }
        else { return docs._id}
    });

    return response;
};

module.exports = group;