const express = require('express');
const route = express.Router();

module.exports = database => {
    const Video = require('../model/video.js')(database);
    return route.get('/', async (req, resp) => {
        let collection = await Video.collection().fetch();
        resp.json(collection);
    });
}


