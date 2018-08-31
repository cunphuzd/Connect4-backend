const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connect', (socket) => {
    console.log('a user connected to the socket');

    socket.on('disconnect', () => console.log('a user left us'));

    socket.on('add-token', (c) => {
        console.log(c);
        io.emit('add-token', c)
    });
});


http.listen(3030);