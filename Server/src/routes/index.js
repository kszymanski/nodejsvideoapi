module.exports = (app, database) => {
    const videos = require('./videos.js')(database);
    app.use('/videos', videos);
}