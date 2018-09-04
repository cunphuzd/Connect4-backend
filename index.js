const express = require('express');
const app = express();
// const basicAuth = ('express-basic-auth');
const bodyParser = require('body-parser');
const knex = require('./knex');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const UsersService = require('./UsersService');
const UsersRouter = require('./UsersRouter');
const GamesService = require('./GamesService');
const GamesRouter = require('./GamesRouter');

// app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let usersService = new UsersService(knex);

app.use('/api', (new UsersRouter(usersService).router()))

let gamesService = new GamesService(knex);

app.use('/api', (new GamesRouter(gamesService).router()))

// io.on('connect', (socket) => {
//     console.log('a user connected to the socket');

//     socket.on('disconnect', () => console.log('a user left us'));

//     socket.on('add-token', (c) => {
//         console.log(c);
//         io.emit('add-token', c)
//     });
// });

// http.listen(3030);
http.listen(3030, () => {
    console.log('listening on port 3030');
});