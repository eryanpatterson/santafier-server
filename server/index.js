const express = require("express");
const jwt = require('jsonwebtoken');
const { group, verify, address } = require("../lib/mongoose");
require('dotenv').config('../.env.local');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/group-register", async (req, res) => { 
    try {
        await group(req.body);
        res.status(200).send();
    } catch {
        res.status(400);
    }
});

app.post("/verify-email", authenticateToken, async (req, res) => {
    const member = req.member;
    console.log(member.name);
    try {
        await verify(member);
    } catch {
        res.sendStatus(403)
    }
    const token = jwt.sign(member, process.env.TOKEN_SECRET);
    res.json({
        token: token
    });
})

app.post("/address", authenticateToken, async (req, res) => {
    address(req.member, req.body.address);

})

function authenticateToken(req, res, next) {
    const token = req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, member) => {
        if (err) return res.sendStatus(403)
        req.member = member
        next()
    })
};



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});