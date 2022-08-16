/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = (knex) => {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();;
    table.string("phoneNumber").unique().notNullable();
    table.timestamps(true, true);
  });
};
// exports.up = function(knex) {
//   return knex.schema.dropTable("user");
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.down = (knex) => {
  
};
