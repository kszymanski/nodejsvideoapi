module.exports = DB  => {
    class Video extends DB.Model {
        get tableName() { return 'videos'; }
    }
    return Video;
}