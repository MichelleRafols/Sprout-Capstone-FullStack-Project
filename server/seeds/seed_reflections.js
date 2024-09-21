/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('reflections').del();

  await knex('reflections').insert([
    {
      title: "Grateful for Today",
      body: "Today was a challenging but rewarding day. I felt God's guidance throughout.",
      created_at: knex.fn.now()
    },
    {
      title: "Finding Peace",
      body: "I found peace in my quiet time and feel ready to take on tomorrow.",
      created_at: knex.fn.now()
    }
  ]);
}
