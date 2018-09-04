class Service {
    constructor(knex) {
        this.knex = knex;
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