
exports.up = function(knex, Promise) {
  return knex.schema.createTable('videos', function(t) {
        t.increments('id').unsigned().primary();
        t.string('title').notNull();
        t.string('description').notNull();
        t.string('path').notNull();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('videos');
};
