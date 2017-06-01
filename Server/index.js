const config = require('./server.config.js');
const database = require('./knexfile.js');
const winston = require('winston');
require('./src/config')(config);

winston.info('Initializing application...');
const app = require('./src')(config, database);

let server = app.listen(config.serverPort, () =>{
    winston.info('server started at port: ', server.address().port);
});