const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    keys = require('./key.js');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: keys.fbID,
    clientSecret: keys.fbSecret,
    callbackURL: 'http://localhost:5001/auth/facebook/callback',
    proxy: true,
    profileFields: ['id', 'emails', 'name']
},
    async (accessToken, refreshToken, profile, done) => {

        const profile_id = profile.id; 
        const profile_name = profile.name.givenName + " " + profile.name.familyName;
        const profile_email = profile.emails[0].value;

        if(!profile_id) {
            return console.log('No Profile obtained.');
        }
        
        User.findOne({ fbID: profile_id })
            .then(user => {
                if(user) {
                    return done(null, user);        
                }else {
                    const newUser = new User({
                        fbId: profile_id,
                        name: profile_name,
                        email: profile_email
                    })
                    newUser.save()
                            .then(user => {
                                return done(null, user);
                            })
                }
            })
    }
));