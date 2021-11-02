const Strategy = require("passport-facebook").Strategy;
const { addUser } = require("./functions");
require('dotenv').config('../.env.local');

const facebookStrategy = new Strategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        const userData = profile._json
        addUser(userData)
        return done (userData);
    }
);

module.exports = facebookStrategy;