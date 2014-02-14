var app = require('express')()
    , server = require('http').createServer(app)
    , path = require('path')
    , io = require('socket.io').listen(server)
    , express = require('express');

/*var express = require('express')()
    , path = require('path')
    , server = require('http').createServer(express)
    , io = require('socket.io').listen(server);*/


//var app = express();
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile('views/index.html');
});

io.sockets.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' });

    socket.on('emit', function (data) {
        console.log("me ha llegado al server esto: "+data);
        socket.broadcast.emit('received', data);
    });

});