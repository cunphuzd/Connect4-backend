class UsersService {
    constructor(knex) {
        this.knex = knex;
    }

    // sign up
    signUp(user) {
        return this.knex
        .insert({
            handle: user.handle,
            password: user.password,
            logged_in: true,
            in_game: false,
            games_played: 0,
            games_won: 0,
            games_lost: 0,
            score: 0,
        })
        .into('users')
        .returning('id')
        .catch(err => {
            throw new Error(err);
        })
    }

    // log in
    logIn(user) {
        return this.knex('users')
        .where('handle', user.handle)
        .where('password', user.password)
        .update({
            logged_in: true,
            in_game: false,
        })
    }

    // log out
    logOut(user) {
        return this.knex('users')
        .where('id', user.id)
        // .where('handle', user.handle)
        // .where('password', user.password)
        .update({
            logged_in: false,
            in_game: false,
        })
    }

    // challenge player screen
    listPlayers(userId) {
        return this.knex
        .select('handle')
        .from('users')
        .where('logged_in', true)
        .where('in_game', false)
        .whereNot("id", userId)
        .orderBy('id', 'asc')
    }

    // change in_game to true
    gameStart(userId) {
        return this.knex('users')
        .where('id', userId)
        .update('in_game', true)
    }

    // change in_game to false
    gameEnd(userId) {
        return this.knex('users')
        .where('id', userId)
        .update('in_game', false)
    }

    // can we combine this with declareWinner in GameServices?
    // how do we update these stats?????????????????????????????????????????????????????????????????? 
    updateUserStats(userId, update) {
        return this.knex('users')
        .where("id", userId) // ???
        .update({
            games_played: update.g_p,
            games_won: update.g_w,
            games_lost: update.g_l,
            score: update.score
        })
    }

    // profile
    displayHistory(userId) {
        return this.knex
        .select('player1', 'player2', 'winner', 'loser')
        .from('games')
        .where('active', false)
        .where('player1', userId)
        .orWhere('player2', userId)
        // .where('active', false)
        // .where(function() {
        //     this.where('user_id_1', userId)
        //     .orWhere('user_id_2', userId)
        // })
        .orderBy('id', 'desc')
    }
}

module.exports = UsersService;