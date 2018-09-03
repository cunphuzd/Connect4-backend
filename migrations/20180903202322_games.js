
exports.up = function (knex, Promise) {
    return knex.schema.createTable('games', (table) => {
        table.increments();
        table.boolean('active');
        table.integer('player1').unsigned();
        table.foreign('player1').references('users.id');
        table.integer('player2').unsigned();
        table.foreign('player2').references('users.id');
        table.integer('winner').unsigned();
        table.foreign('winner').references('users.id');
        table.integer('loser').unsigned();
        table.foreign('loser').references('users.id');
        table.timestamps(false, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('games');
};
