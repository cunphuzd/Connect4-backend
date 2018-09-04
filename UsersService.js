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

    // log in
    logIn(user) {
        return this.knex('users')
        .where('handle', user.handle)
        .where('password', user.password)
        .update({
            logged_in: true,
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
        })
    }

    // challenge player screen
    listPlayers() {
        return this.knex
        .select('handle')
        .from('users')
        .where('logged_in', true)
        // .whereNot("id", /*req.auth.id = userId = users[0].id*/)
    }
}

module.exports = UsersService;