class Service {
    constructor(knex) {
        this.knex = knex;
    }

    // sign up
    signUp(handle, password) {
        return this.knex
        .insert({
            handle: handle,
            password: password,
            logged_in: true,
            games_played: 0,
            games_won: 0,
            games_lost: 0,
            score: 0,
        })
        .into('users')
        .catch(err => {
            throw new Error(err);
        })
    }

    logIn(user) {
        return this.knex('user')
        .where(user, /*req.auth.id = userId = users[0].id*/)
        .update({
            logged_in: true,
        })
    }

    logOut(user) {
        return this.knex('user')
        .where(user, /*req.auth.id = userId = users[0].id*/)
        .update({
            logged_in: false,
        })
    }

    // observe games page
    listGames() {
        return this.knex
        .select('id', 'user_id_1', 'user_id_2')
        .from('games')
        .where('active', true)
        .orderBy('id', 'asc')
    }

    // observe active game
    updateGameBoard(games) {
        return this.knex
        .select('id', 'user_id', 'col')
        .from('moves')
        .where('game_id', games.id)
        .orderBy('id', 'desc')
    }

    // challenge player
    listPlayers() {
        return this.knex
        .select('handle')
        .from('users')
        .where('logged_in', true)
        .whereNot("id", /*req.auth.id = userId = users[0].id*/)
    }

    // game
    initiateGame(game) {
        return this.knex
        .insert({
            active: true,
            user_id_1: game.user_id_1,
            user_id_2: game.user_id_2,
        })
        .into('games')
        // .catch(err => {
        //     throw new Error(err);
        // })
    }

    addToken(move) {
        return this.knex
        .insert({
            game_id: move.game_id, // ???
            user_id: move.user_id, // ???
            col: move.col, // ???
        })
        .into('moves')
        // .catch(err => {
        //     throw new Error(err);
        // })
    }

    declareWinner(game, winner, loser) { // do I need to use params here?
        return this.knex('games') // can we use .into('games') instead of knex('games')
        .where(game, games.id) // ???
        .update({
            active: false,
            winner: winner,
            loser: loser,
        })
        // .catch(err => {
        //     throw new Error(err);
        // })
    }

    // can we combine this with declareWinner?
    // how do we update these stats?????????????????????????????????????????????????????????????????? 
    updateUserStats(id, g_p, g_w, g_l) {
        return this.knex('users')
        .where("id", id) // ???
        .update({
            games_played: g_p,
            games_won: g_w,
            games_lost: g_l,
        })
    }

    // scoreboard
    displayScoreboard() {
        return this.knex
        .select('handle', 'score')
        .from('users')
        .orderBy('score', 'desc')
        .limit(10)
    }

    // profile
    displayGamesPlayed() {
        return this.knex
        .select('user_id_1', 'user_id_2', 'winner', 'loser')
        .from('games')
        .where('active', false)
        .where('user_id_1', /*req.auth.id = userId = users[0].id*/)
        .orWhere('user_id_2', /*req.auth.id = userId = users[0].id*/)
        .orderBy(games.id, 'desc')
    }
}

module.exports = Service;