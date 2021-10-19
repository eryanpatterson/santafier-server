const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config('../.env.local');

const MONGO_DB = process.env.MONGO_DB;
const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
    
        cached.promise = MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            return {
                client,
                db: client.db(MONGO_DB),
            }
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

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

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/group-register", async (req, res) => { 
    const groupId = await createGroup(req.body);
    res.json({ groupId: groupId })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});