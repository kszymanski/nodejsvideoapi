module.exports = (app, model, auth) => {
    const videos = require('./videos.js')(model.Videos);
    app.use('/videos',auth, videos);
}