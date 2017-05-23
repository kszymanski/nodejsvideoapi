const config = require('./server.config.js');
const database = require('./knexfile.js');
const winston = require('winston');
require('./src/config')(config);

winston.info('Initializing application...');
const app = require('./src')(config, database);

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;


let server = app.listen(config.serverPort, () =>{
    winston.info('server started at port: ', server.address().port);
});

//639861488672-555dggtnp1dm3r242dljobndrtvi7em4.apps.googleusercontent.com
//bqPEJ5LuDYtid7d8gZVkokYx
//http://localhost:3000/auth/callback/google