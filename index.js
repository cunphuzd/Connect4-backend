const express = require('express');
const app = express();
// const basicAuth = ('express-basic-auth');
const bodyParser = require('body-parser');
const knex = require('./knex');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const UsersService = require('./UsersService');
const UsersRouter = require('./UsersRouter');

// app.use(cors());

// function myAsyncAuthorizer(username, password, cb) {
//     knex.select('*').from('users')
//     .where('handle', username)
//     .where('password', password)
//     .then((users) => {
//         if (users.length > 0) {
//             cb(null, true);
//         } else {
//             cb(null, false);
//         }
//     })
//     .catch(err => {
//         cb(err, false);
//     });
// }

// app.use(basicAuth({
//     authorizer: myAsyncAuthorizer,
//     authorizeAsync: true,
//     challenge: true,
//     realm: 'connect4',
// }))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let userService = new UsersService(knex);

app.use('/api', (new UsersRouter(userService).router()))

// app.use(new Router());

// app.get('/users')

// app.get('/games')

// app.post('/moves')

// app.post('users')

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