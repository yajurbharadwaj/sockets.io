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

var roomno = 1;
var full = 0;

io.on('connection', function (socket) {   //with this on-method, a predefined object connection is passed into the socket through function 
    console.log('a user connected');

    socket.join("room-" + roomno);        // this connects the channel to the socket and a room has been created 
    io.sockets.in("room-" + roomno).emit('connectedRoom', "You are connected to the roomno " + roomno);
    //a default namespace '/' is firing an event called 'connectedroom' into the channel called 'roomno'.

    full++;
    if (full >= 2) {        //max 2 users in one room
        full = 0;           //if max reached then shift the next user to next room
        roomno++;
    }

    socket.on('disconnect', function () {    // with ths the socket parameter as an object will check if the user is connected or disconnected.
        console.log('a user disconnected');

        full++;
        if (full >= 2) {        //max 2 users in one room
            full = 0;           //if max reached then shift the next user to next room
            roomno--;
        }
    });
});

http.listen(3000, function () {
    console.log('server ready on 3000');
});
