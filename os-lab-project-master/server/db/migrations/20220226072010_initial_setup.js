/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('process', (table) => {
      // pid is the primary key
      table.integer("pid").primary();
      table.string("pname", 100).notNullable();
      table.integer("arr_time").notNullable();
      table.integer("exe_time").notNullable();
      table.integer("priority").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('process');
};
