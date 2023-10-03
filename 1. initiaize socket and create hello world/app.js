var app = require('express')();

var http = require('http').Server(app); n

var path = require('path');

var io = require('socket.io')(http);

app.get('/', function (req, res) {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'index.html';
    res.sendFile(fileName, options);
});

http.listen(3000, function () {
    console.log('server ready on 3000');
});
