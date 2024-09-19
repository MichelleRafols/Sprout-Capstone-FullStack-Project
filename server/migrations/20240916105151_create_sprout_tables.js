/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('energy_levels', function (table) {
            table.increments('id').primary();
            table.integer('level').notNullable();
            table.text('description').notNullable();
        })
        .createTable('bible_verses', function (table) {
            table.increments('id').primary();
            table.integer('energy_level_id').unsigned().references('id').inTable('energy_levels').onDelete('CASCADE');
            table.text('verse_text').notNullable();
            table.string('reference').notNullable();
            table.string('bible_version').notNullable().defaultTo('NIV'); // Default Bible version to 'NIV'
        })
        .createTable('indoor_activities', function (table) {
            table.increments('id').primary();
            table.integer('energy_level_id').unsigned().references('id').inTable('energy_levels').onDelete('CASCADE');
            table.string('activity_name').notNullable();
            table.text('description').notNullable();
            table.string('icon').notNullable();  // Column for storing icon name or path for indoor activity
        })
        .createTable('outdoor_activities', function (table) {
            table.increments('id').primary();
            table.integer('energy_level_id').unsigned().references('id').inTable('energy_levels').onDelete('CASCADE');
            table.string('activity_name').notNullable();
            table.text('description').notNullable();
            table.string('icon').notNullable();  // Column for storing icon name or path for outdoor activity
            table.string('event_id').nullable();  // Optional if using Eventbrite API
        });
};

export function down(knex) {
    return knex.schema
        .dropTableIfExists('outdoor_activities')
        .dropTableIfExists('indoor_activities')
        .dropTableIfExists('bible_verses')
        .dropTableIfExists('energy_levels');
};
