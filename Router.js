const express = require('express')

class Router {
    constructor(service) {
        this.service = service
    }

    router() {
        const router = new express.Router();

        // profile
        router.get('/users/:id', this.listGames.bind(this)); 

        return router;
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