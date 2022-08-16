/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = (knex) => {
  return knex.schema.createTable("wallet", (table) => {
    table.increments("id").primary();
    table.string("accountholder").notNullable();
    table.string("accountNumber").notNullable();
table.string("bankName").defaultTo("WEMA");
    table.decimal("balance", 10, 2).defaultTo(0.0);
    table.integer("userId").unsigned().references("user.id").notNullable();
    table.timestamps(true, true);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
