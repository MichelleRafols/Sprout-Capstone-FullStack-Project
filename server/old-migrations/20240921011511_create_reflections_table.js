/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('reflections', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('body').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema
        .dropTableIfExists('reflections');
}
