const express = require("express");
const jwt = require('jsonwebtoken');
const path = require('path')
const { group, verify, address, checkToken, deleteToken, checkGroup, createAddressToken } = require("../lib/mongoose");
require('dotenv').config('../.env.local');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "front-end")));

app.post("/api/group-register", async (req, res) => { 
    try {
        await group(req.body);
        res.status(200).send({message: "Hello"});
    } catch {
        res.status(400);
    }
});

app.post("/api/verify-email", authenticateVerificationToken, async (req, res) => {
    const member = req.member;
    try {
        await verify(member);
    } catch {
        res.sendStatus(403)
    }
    await deleteToken(req.body.token);
    const token = await createAddressToken(member);
    res.status(200).send({
        token: token
    });
})

app.post("/api/address", authenticateAddressToken, async (req, res) => {  
    
    try {
        await address(req.member, req.body.address);
        await checkGroup(req.member);
        await deleteToken(req.body.token);
        res.sendStatus(200);
    } catch {
        res.sendStatus(403);
    }
    

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "front-end/index.html"));
});

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
    const token = req.body.token.token;
    const check = await checkToken(token);
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