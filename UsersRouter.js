const express = require('express')

class UsersRouter {
    constructor(usersService) {
        this.usersService = usersService
    }

    router() {
        const router = new express.Router();

        // sign up
        router.post('/users/signup', this.signUp.bind(this)); // WHAT DOES THIS.POST.BIND(THIS) DO????

        // log in
        router.put('/users/login', this.logIn.bind(this));

        // log out
        router.put('/users/logout', this.logOut.bind(this));

        // challenge player
        router.get('/users', this.listPlayers.bind(this));

        // change in_game to true
        router.put('/users', this.gameStart.bind(this));

        // change in_game to false
        router.put('/users', this.gameEnd.bind(this));

        // update user stats
        router.put('/users', this.updateUserStats.bind(this));

        return router;
    }

    signUp(req, res) {
        console.log('sign up')
        return this.usersService.signUp(req.body)
        // .then(() => {
        //     this.usersService.listPlayers()
        // })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    logIn(req, res) {
        console.log('log in')
        return this.usersService.logIn(req.body)
        // .then(() => {
        //     this.usersService.listPlayers()
        // })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    logOut(req, res) {
        console.log('log out')
        return this.usersService.logOut(req.body)
        // .then(() => {
        //     this.usersService.listPlayers()
        // })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    listPlayers(req, res) {
        console.log('getting users')
        return this.usersService.listPlayers(req.query.user_id)
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    gameStart(req, res) {
        console.log('change in_game to true')
        return this.usersService.gameStart(req.body)
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    gameEnd(req, res) {
        console.log('change in_game to false')
        return this.usersService.gameEnd(req.body)
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    updateUserStats(req, res) {
        console.log('update user stats')
        return this.usersService.updateUserStats(req.body)
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }
}

module.exports = UsersRouter;