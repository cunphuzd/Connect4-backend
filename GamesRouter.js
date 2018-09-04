const express = require('express')

class GamesRouter {
    constructor(gamesService) {
        this.gamesService = gamesService
    }

    router() {
        const router = new express.Router();

        // list games
        router.get('/games', this.listGames.bind(this)); // WHAT DOES THIS.POST.BIND(THIS) DO????

        // observing active game
        router.get('/games/moves/:id', this.updateGameBoard.bind(this));

        // start game
        router.post('/games', this.startGame.bind(this));

        // add token
        router.post('/games/moves', this.addToken.bind(this));

        // declare winner
        router.put('/games', this.declareWinner.bind(this));

        // scoreboard
        router.get('/scoreboard', this.displayScoreboard.bind(this)); 

        return router;
    }

    listGames(req, res) {
        console.log('list active games')
        return this.gamesService.listGames()
        .then((games) => res.json(games))
        .catch(err => res.status(500).json(err)) 
    }

    updateGameBoard(req, res) {
        console.log('update game board')
        return this.gamesService.updateGameBoard(req.params.id)
        // .then(() => {
        //     this.gamesService.listPlayers()
        // })
        .then((moves) => res.json(moves))
        .catch(err => res.status(500).json(err)) 
    }

    startGame(req, res) {
        console.log('start game')
        return this.gamesService.startGame(req.body)
        // .then(() => {
        //     this.gamesService.listPlayers()
        // })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }

    addToken(req, res) {
        console.log('add token')
        return this.gamesService.addToken(req.body)
        .then((token) => res.json(token))
        .catch(err => res.status(500).json(err)) 
    }

    declareWinner(req, res) {
        console.log('declare winner')
        return this.gamesService.declareWinner(req.body)
        .then((winner) => res.json(winner))
        .catch(err => res.status(500).json(err)) 
    }

    displayScoreboard(req, res) {
        console.log('display scoreboard')
        return this.gamesService.displayScoreboard()
        .then((users) => res.json(users))
        .catch(err => res.status(500).json(err)) 
    }
}

module.exports = GamesRouter;