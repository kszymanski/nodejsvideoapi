const config = require('./server.config.js');
const database = require('./knexfile.js');
const winston = require('winston');
require('./src/config')(config);

winston.info('Initializing application...');
const app = require('./src')(config, database);

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    done(id, user);

});
passport.use(new GoogleStrategy({
    clientID: "639861488672-555dggtnp1dm3r242dljobndrtvi7em4.apps.googleusercontent.com",
    clientSecret: 'bqPEJ5LuDYtid7d8gZVkokYx',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
        winston.info('token', token);
        winston.info('profile', profile);
        return done(null, profile);
  }
));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/auth/google', passport.authenticate('google', { scope: [ 'openid', 'profile'], session: false }));

passport.use(new BearerStrategy(
  function(token, done) {
      if(token){
        var request = require('request');
        let url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+token
        request(url, (error, response, body) => {
            winston.info('body', body);
            done(false, token);
        })
      }
    
  }
));


app.get('/xd',passport.authorize('bearer',{ session: false }), (req,res)=>{
    res.send('done');
})


let server = app.listen(config.serverPort, () =>{
    winston.info('server started at port: ', server.address().port);
});

//639861488672-555dggtnp1dm3r242dljobndrtvi7em4.apps.googleusercontent.com
//bqPEJ5LuDYtid7d8gZVkokYx
//http://localhost:3000/auth/callback/google