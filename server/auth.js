const FacebookStrategy = require("passport-facebook").Strategy;
require('dotenv').config('../.env.local');

const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
);

module.exports = facebookStrategy;