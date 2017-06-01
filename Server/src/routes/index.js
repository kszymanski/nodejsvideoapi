module.exports = (app, model, auth, filePath) => {
    const videos = require('./videos.js')(model.Videos, filePath);
    app.use('/videos', videos.free);
    app.use('/videos',auth, videos.routes);

    app.use('/*', (req, res) => {
        res.status(404).send();
    });
}