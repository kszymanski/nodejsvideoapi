const winston = require('winston');

module.exports = database => {
    winston.debug('Configuring databese connection...');
    return require('bookshelf')(require('knex')(database));
}