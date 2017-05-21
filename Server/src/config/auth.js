const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = (app, User, config) => {
    app.use(passport.initialize());

    passport.use(new GoogleStrategy({
        clientID: "639861488672-555dggtnp1dm3r242dljobndrtvi7em4.apps.googleusercontent.com",
        clientSecret: 'bqPEJ5LuDYtid7d8gZVkokYx',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        function (token, tokenSecret, profile, done) {
            //user find or create
            return done(null, profile);
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
                    winston.info('body', body);
                    //103264025647430110696
                    //103264025647430110696
                    done(false, token);
                })
            }

        }
    ));

}