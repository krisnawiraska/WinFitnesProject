/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('category_traning_detail', (table)=>{
        table.increments();
        table.integer("traning_id").unsigned().references("id").inTable("category_traning").onUpdate('CASCADE').onDelete('CASCADE');
        table.string("vidio")
        table.timestamp("created_at");
        table.timestamp("updated_at");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('category_traning_detail')
};
