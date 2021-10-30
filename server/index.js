const express = require("express");
const facebookStrategy = require("./auth");
const passport = require("passport");
const group = require("../lib/group");
const { createGroup, addUser, countGroup, getMessage } = require("./functions");
const connectToDatabase = require('../utils/mongodb')
require('dotenv').config('../.env.local');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/group-register", async (req, res) => { 
    const groupId = await group(req.body);
    res.json({ groupId: groupId })
})

passport.use(facebookStrategy);

app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: 'http://google.com' }),
    function(req, res) {
        res.redirect('http://localhost:3000/');
    });


app.get('/test', async (req, res) => {
    const message = connectToDatabase(getMessage);
    res.status(200).send(message)
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});