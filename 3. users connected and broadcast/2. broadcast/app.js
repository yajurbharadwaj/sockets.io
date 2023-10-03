var app = require('express')();    // this () is required to use get and post method

var http = require('http').Server(app);     //http module which connects the server application

var path = require('path');         //path module

var io = require('socket.io')(http);    // the server which was passed in http module is now passed into the socket.io

app.get('/', function (req, res) {
    var options = {
        root: path.join(__dirname)   //for defining the path
    }
    var fileName = 'index.html';
    res.sendFile(fileName, options);    //render the path present in the options into the fileName when we specify the / router
});

var users = 0;

io.on('connection', function (socket) {   //with this on-method, a predefined object connection is passed into the socket through function 
    console.log('a user connected');
    users++;

    socket.emit('newuserconnect', { message: 'hello welcome :)' }) //this will show only the new user with a welcome message.
    socket.broadcast.emit('newuserconnect', { message: users + ' users connected' });

    socket.on('disconnect', function () {    // with ths the socket parameter as an object will check if the user is connected or disconnected.
        console.log('a user disconnected');
        users--;
        socket.broadcast.emit('newuserconnect', { message: users + ' users connected' });
    });
});

http.listen(3000, function () {
    console.log('server ready on 3000');
});