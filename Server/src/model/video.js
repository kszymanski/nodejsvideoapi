module.exports = database =>{
    const DB = require('./database.js')(database);
    class Video extends DB.Model {
        get tableName() { return 'videos'; }
    }
    return Video;
}


