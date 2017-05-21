module.exports = {
    logLevel: process.env.LOG_LEVEL || 'debug',
    environment: process.env.NODE_ENV || 'Development',
    serverPort: process.env.SERVER_PORT || '3000',
    database: {
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
}