
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
        t.string('id').primary();
        t.string('name').notNull();
    })
    .then(()=>{
        return knex.schema.table('videos', videos =>{
            videos.string('user_id').references('users.id');
        });
    });
};

exports.down = function(knex, Promise) {
  return knex.table('videos', videos =>{
      videos.dropColumn('user_id');
  })
    .then(() => {
      return knex.schema.dropTable('users')
    });
};
