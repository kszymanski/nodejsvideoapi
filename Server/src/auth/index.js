const winston = require('winston');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = (app, Users, config) => {
    app.use(passport.initialize());

    passport.use(new GoogleStrategy({
        clientID: "639861488672-555dggtnp1dm3r242dljobndrtvi7em4.apps.googleusercontent.com",
        clientSecret: 'bqPEJ5LuDYtid7d8gZVkokYx',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        function (token, tokenSecret, profile, done) {
            winston.debug('Google login profile id', profile.id);
            winston.debug('Google login token', token);
            new Users({ id: profile.id }).fetch().then(model => {
                if(!!model){
                    return done(null, model);
                }else{
                    new Users({ id: profile.id, name: profile.displayName }).save(null, {method: 'insert'})
                    .then(saved => {
                        return done(null, saved);
                    });
                }

            });
        }
    ));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login', session: false }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    app.get('/auth/google', passport.authenticate('google', { scope: ['openid', 'profile'], session: false }));

    passport.use(new BearerStrategy(
        function (token, done) {
            if (token) {
                var request = require('request');
                let url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token
                request(url, (error, response, body) => {
                    if(!!error){
                        done(error);
                    }
                    let info = JSON.parse(body);
                    new Users({id: info.user_id}).fetch().then(model => {
                        if(!!model){
                            done(false, model);
                        }else{
                            done({msg: "user doeas not exists"}, info.user_id);
                        }
                    });
                })
            }

        }
    ));

    return passport.authenticate('bearer', { session: false });
}