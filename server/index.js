const express = require("express");
const facebookStrategy = require("./auth");
const passport = require("passport");
const sendEmail = require("./mailer");
const { createGroup, addUser, countGroup } = require("./functions");
require('dotenv').config('../.env.local');


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/group-register", async (req, res) => { 
    const groupId = await createGroup(req.body);
    res.json({ groupId: groupId })
})

passport.use(facebookStrategy);

app.get('/auth/facebook', async (req, res) => {
    passport.authenticate('facebook', { scope: 
    [
        'email', 'public_profile',    
    ]});
    res.json({ message: 'hello'});
});
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/register' }),
    function(req,res) {
        res.redirect('/');
    });

app.post('/user-add', async (req, res) => {
    await addUser(req.body);
    countGroup(req.body);
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});