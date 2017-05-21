const winston = require('winston');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = (config, database )=> {
    winston.debug('Environment:', config.environment);
    let app = express();

    winston.debug('Setting up middlewares...');

    if(config.environment === 'Development'){
        app.use(morgan('dev'));
    }else if(config.environment === 'Production'){
        app.use(morgan('common'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    winston.debug('Setting up routes...');
    require('./routes')(app, database);

    return app;
};