/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table)=>{
        table.increments();
        table.string('name');
        table.string('no_hp');
        table.string('address');
        table.string('email');
        table.string('password');
        table.date('date_start_member');
        table.date('date_end_member');
        table.enu('role',['admin', 'customer']);
        table.timestamp("created_at");
        table.timestamp("updated_at");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
