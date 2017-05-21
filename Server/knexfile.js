const config = require('./server.config.js');
module.exports = {
  client: 'mysql',
  connection: {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    charset: 'utf8'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
