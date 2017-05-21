const winston = require('winston');

module.exports =  config => {
    winston.level = config.logLevel || 'info';
};