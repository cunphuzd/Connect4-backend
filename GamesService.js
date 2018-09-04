class GamesService {
    constructor(knex) {
        this.knex = knex;
    }

    // active games page
    listGames() {
        return this.knex
        .select('id', 'player1', 'player2')
        .from('games')
        .where('active', true)
        .orderBy('id', 'asc')
    }
    
    // observing active game
    updateGameBoard(gameId) {
        return this.knex
        .select('id', 'user_id', 'col')
        .from('moves')
        .where('game_id', gameId)
        .orderBy('id', 'desc')
    }

    // playing game
    startGame(game) {
        return this.knex
        .insert({
            active: true,
            player1: game.player1,
            player2: game.player2,
        })
        .into('games')
        // .catch(err => {
        //     throw new Error(err);
        // })
    }

    addToken(token) {
        return this.knex
        .insert({
            game_id: token.game_id, // ???
            user_id: token.user_id, // ???
            col: token.col, // ???
        })
        .into('moves')
        // .catch(err => {
        //     throw new Error(err);
        // })
    }

    declareWinner(winner) { // do I need to use params here or req.body?
        return this.knex('games') // can we use .into('games') instead of knex('games')
        .where('id', winner.gameId) // ???
        .update({
            active: false,
            winner: winner.winner,
            loser: winner.loser,
        })
        // .catch(err => {
        //     throw new Error(err);
        // })
    }
}

module.exports = GamesService;