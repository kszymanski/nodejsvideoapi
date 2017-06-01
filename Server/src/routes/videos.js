const winston = require('winston');
const express = require('express');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const route = express.Router();
const freeRoute = express.Router();

module.exports = (Videos, filepath) => {
    freeRoute.get('/', async (req, res) => {
        let collection = await Videos.collection().fetch();
        res.json({
            totalRecords: collection.length,
            videos: collection
        });
    });

     freeRoute.get('/xdxd', (req, res) => {
    console.log(filepath);
    let filename = path.join(filepath, '103264025647430110696', "filename.mp4");
    var stat = fs.statSync(filename);
    var rangeRequest = readRangeHeader(req.headers['range'], stat.size);
    var responseHeaders = {};
    responseHeaders['Content-Type'] = 'audio/mp4';
    responseHeaders['Content-Length'] = stat.size;

    if (rangeRequest == null) {
        responseHeaders['Accept-Ranges'] = 'bytes';

        //  If not, will return file directly.
        sendResponse(resp, 200, responseHeaders, fs.createReadStream(filename));
        return null;
    }


    var start = rangeRequest.Start;
    var end = rangeRequest.End;

    // If the range can't be fulfilled. 
    if (start >= stat.size || end >= stat.size) {
        // Indicate the acceptable range.
        responseHeaders['Content-Range'] = 'bytes */' + stat.size; // File size.

        // Return the 416 'Requested Range Not Satisfiable'.
        sendResponse(resp, 416, responseHeaders, null);
        return null;
    }

    // Indicate the current range. 
    responseHeaders['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size;
    responseHeaders['Content-Length'] = start == end ? 0 : (end - start + 1);
    responseHeaders['Accept-Ranges'] = 'bytes';
    responseHeaders['Cache-Control'] = 'no-cache';

    // Return the 206 'Partial Content'.
    sendResponse(resp, 206,
        responseHeaders, fs.createReadStream(filename, { start: start, end: end }));
    });

    route.post('/', (req, res) => {
        const user = req.user;
        winston.debug(user);
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            winston.debug('File: ', fieldname);
            winston.debug('filename: ', filename);
            winston.debug('encoding: ', encoding);
            winston.debug('mimetype: ', mimetype);
            file.pipe(fs.createWriteStream(path.join(filepath, user.id.toString(), "filename.mp4")));
            file.on('end', function () {
                winston.debug('File Finished!', fieldname);
            });
        });

        busboy.on('finish', function () {
            console.log('Done parsing form!');
            res.writeHead(201, { Connection: 'close' });
            res.end();
        });
        req.pipe(busboy);
    });

    return {
        routes: route,
        free: freeRoute
    };
}

route.get('/:id/stream', (req, resp) => {
    //let collection = await Videos.collection().fetch();
    let filename = './fff.mp4';
    var stat = fs.statSync(filename);
    var rangeRequest = readRangeHeader(req.headers['range'], stat.size);
    var responseHeaders = {};
    responseHeaders['Content-Type'] = 'audio/mp4';
    responseHeaders['Content-Length'] = stat.size;

    if (rangeRequest == null) {
        responseHeaders['Accept-Ranges'] = 'bytes';

        //  If not, will return file directly.
        sendResponse(resp, 200, responseHeaders, fs.createReadStream(filename));
        return null;
    }


    var start = rangeRequest.Start;
    var end = rangeRequest.End;

    // If the range can't be fulfilled. 
    if (start >= stat.size || end >= stat.size) {
        // Indicate the acceptable range.
        responseHeaders['Content-Range'] = 'bytes */' + stat.size; // File size.

        // Return the 416 'Requested Range Not Satisfiable'.
        sendResponse(resp, 416, responseHeaders, null);
        return null;
    }

    // Indicate the current range. 
    responseHeaders['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size;
    responseHeaders['Content-Length'] = start == end ? 0 : (end - start + 1);
    responseHeaders['Accept-Ranges'] = 'bytes';
    responseHeaders['Cache-Control'] = 'no-cache';

    // Return the 206 'Partial Content'.
    sendResponse(resp, 206,
        responseHeaders, fs.createReadStream(filename, { start: start, end: end }));


    //resp.writeHead(200, responseHeaders);
    //fs.createReadStream(filename).pipe(resp);
    //resp.json(collection);
});



function readRangeHeader(range, totalLength) {
    if (range == null || range.length == 0)
        return null;

    var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
    var start = parseInt(array[1]);
    var end = parseInt(array[2]);
    var result = {
        Start: isNaN(start) ? 0 : start,
        End: isNaN(end) ? (totalLength - 1) : end
    };

    if (!isNaN(start) && isNaN(end)) {
        result.Start = start;
        result.End = totalLength - 1;
    }

    if (isNaN(start) && !isNaN(end)) {
        result.Start = totalLength - end;
        result.End = totalLength - 1;
    }

    return result;
}

function sendResponse(response, responseStatus, responseHeaders, readable) {
    response.writeHead(responseStatus, responseHeaders);

    if (readable == null)
        response.end();
    else
        readable.on('open', function () {
            readable.pipe(response);
        });

    return null;
}
