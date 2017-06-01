const path = require('path');

module.exports = {
    logLevel: process.env.LOG_LEVEL || 'debug',
    environment: process.env.NODE_ENV || 'Development',
    serverPort: process.env.SERVER_PORT || '3000',
    database: {
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    },
    filePath: path.join(__dirname, "tmp"),
    auth: {
        clientID: "639861488672-555dggtnp1dm3r242dljobndrtvi7em4.apps.googleusercontent.com",
        clientSecret: 'bqPEJ5LuDYtid7d8gZVkokYx',
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}