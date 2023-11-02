/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions_member',(table) =>{
        table.increments();
        table.integer("user_id").unsigned().references("id").inTable("users").onUpdate('CASCADE').onDelete('CASCADE');
        table.integer("product_id").unsigned().references("id").inTable("member_products").onUpdate('CASCADE').onDelete('CASCADE');
        table.date("date_start");
        table.date("date_end");
        table.string("prof_of_payment");
        table.enum("status",["waiting confirmation", "succes"]);
        table.timestamp("created_at");
        table.timestamp("updated_at");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('transactions_member')
};
