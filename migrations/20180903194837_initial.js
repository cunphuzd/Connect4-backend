
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('handle');
        table.string('password');
        table.boolean('logged_in');
        table.boolean('in_game');
        table.integer('games_played').unsigned();
        table.integer('games_won').unsigned();
        table.integer('games_lost').unsigned();
        table.integer('score').unsigned();
        table.timestamps(false, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
