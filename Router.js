const express = require('express')

class Router {
    constructor(service) {
        this.service = service
    }

    router() {
        const router = new express.Router();

        // sign up
        router.post('/users', this.post.bind(this));

        // log in

        // log out

        // active games

        // observing active game

        // challenge player
        router.get('/users', this.get.bind(this));

        // game

        // scoreboard

        // profile


        return router;
    }

    get(req, res) {
        console.log('getting: users')
        return this.service.listPlayers()
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    post(req, res) {
        console.log('posting: users')
        return this.service.signUp(req.body)
        .then(() => {
            this.service.listPlayers()
        })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }
}

module.exports = Router;