const express = require('express')

class UsersRouter {
    constructor(userService) {
        this.userService = userService
    }

    router() {
        const router = new express.Router();

        // sign up
        router.post('/users/signup', this.post.bind(this)); // WHAT DOES THIS.POST.BIND(THIS) DO????

        // log in
        router.put('/users/login', this.put.bind(this));

        // log out
        router.put('/users/logout', this.put.bind(this));

        // // challenge player
        // router.get('/users', this.get.bind(this));

        return router;
    }

    post(req, res) {
        console.log('sign up')
        return this.userService.signUp(req.body)
        // .then(() => {
        //     this.userService.listPlayers()
        // })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    put(req, res) {
        console.log('log in')
        return this.userService.logIn(req.body)
        // .then(() => {
        //     this.userService.listPlayers()
        // })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    put(req, res) {
        console.log('log out')
        return this.userService.logOut(req.body)
        // .then(() => {
        //     this.userService.listPlayers()
        // })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }
}

module.exports = UsersRouter;