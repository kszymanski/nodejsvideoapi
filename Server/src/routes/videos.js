const express = require('express');
const route = express.Router();

module.exports = Videos => {

    return route.get('/', async (req, resp) => {
        console.log(req.user);
        let collection = await Videos.collection().fetch();
        resp.json(collection);
    });
}