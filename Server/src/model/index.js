module.exports = database => {
    const DB = require('./database')(database);
    return {
        Users: require('./user')(DB),
        Videos: require('./video')(DB)
    }
}