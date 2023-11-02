/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('attandances', (table)=>{
        table.increments();
        table.integer("user_id").unsigned().references("id").inTable("users").onUpdate('CASCADE').onDelete('CASCADE')
        table.timestamp('date_attandance')
        table.timestamp("created_at");
        table.timestamp("updated_at");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('attandances')
};
