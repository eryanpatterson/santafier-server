const express = require("express");
const jwt = require('jsonwebtoken');
const { group, verify, address, checkToken, deleteToken } = require("../lib/mongoose");
require('dotenv').config('../.env.local');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/group-register", async (req, res) => { 
    console.log(req.body)
    try {
        await group(req.body);
        res.status(200).send({message: "Hello"});
    } catch {
        res.status(400);
    }
});

app.post("/verify-email", authenticateVerificationToken, async (req, res) => {
    const member = req.member;
    try {
        await verify(member);
    } catch {
        res.sendStatus(403)
    }
    await deleteToken(req.body.token);
    const token = jwt.sign(member, process.env.ADDRESS_TOKEN_SECRET);
    res.status(200).send({
        token: token
    });
})

app.post("/address", authenticateAddressToken, async (req, res) => {  
    
    try {
        await address(req.member, req.body.address);
        await deleteToken(req.body.token);
        res.sendStatus(200);
    } catch {
        res.sendStatus(403);
    }
    

})

async function authenticateVerificationToken(req, res, next) {
    const token = req.body.token;
    const check = await checkToken(token);
    
    if (!check) return res.sendStatus(403);
    jwt.verify(token, process.env.VERIFY_TOKEN_SECRET, (err, member) => {
        if (err) return res.sendStatus(403)
        req.member = member
        next()
    })
};

async function authenticateAddressToken(req, res, next) {
    const token = req.body.token;
    const check = await checkToken(token);
    console.log(check);
    if (!check) return res.sendStatus(403);
    jwt.verify(token, process.env.ADDRESS_TOKEN_SECRET, (err, member) => {
        if (err) return res.sendStatus(403)
        req.member = member
        next()
    })
};

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});