const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('./knex');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const GameRouter = require('./GameRouter');

app.use(bodyParser.urlencoded({extended:true}));

app.use(new GameRouter());

// app.get('/users')

// app.get('/games')

// app.post('/moves')

// app.post('users')

io.on('connect', (socket) => {
    console.log('a user connected to the socket');

    socket.on('disconnect', () => console.log('a user left us'));

    socket.on('add-token', (c) => {
        console.log(c);
        io.emit('add-token', c)
    });
});


http.listen(3030);