
exports.up = function (knex, Promise) {
    return knex.schema.createTable('moves', (table) => {
        table.increments();
        table.integer('game_id').unsigned();
        table.foreign('game_id').references('games.id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.string('col');
        table.timestamps(false, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('moves');
};
