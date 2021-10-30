const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const uri = process.env.MONGO_URI;
// Use connect method to connect to the Server
const client = new MongoClient(uri);

async function connectToDatabase(callback) {
  try {  
    await client.connect();

    const db = await client.db;
    const res = callback(db);
    return res;
  } finally {
    await client.close();
  }
};

module.exports = connectToDatabase;