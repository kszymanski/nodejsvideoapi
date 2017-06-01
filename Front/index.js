const express = require('express');
var path = require('path');

let app = express();


app.get('/', (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'src', 'index.html'));
});
app.get('/send', (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'src', 'send.html'));
});

app.listen(5000);