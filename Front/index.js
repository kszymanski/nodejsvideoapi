const express = require('express');
var path = require('path');

let app = express();


app.get('/login', (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'src', 'login.html'));
});

app.get('/', (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(5000);