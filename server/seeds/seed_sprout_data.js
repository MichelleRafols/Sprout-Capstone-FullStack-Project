/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const seedEnergyLevels = async (knex) => {
  // Deletes ALL existing entries
  await knex('energy_levels').del();

  // Inserts seed entries
  await knex('energy_levels').insert([
    { level: 1, description: 'Feeling fatigued, drained, or emotionally exhausted? At this energy level, it\'s okay to rest and recharge. Gentle, comforting activities will help you feel restored.' },
    { level: 2, description: 'You’re feeling low but not completely drained. Light, calming activities can refresh your mind and body. This is a good time to engage in gentle reflection.' },
    { level: 3, description: 'You have a balanced amount of energy today. You\'re ready to engage in moderate physical and mental activities.' },
    { level: 4, description: 'You’re feeling energetic and motivated! This is a great time to take on physically engaging or creative tasks.' },
    { level: 5, description: 'You’re full of energy, excitement, and motivation! You’re ready to take on bigger challenges and make the most of your day.' }
  ]);
};

const seedBibleVerses = async (knex) => {
  await knex('bible_verses').del();

  await knex('bible_verses').insert([
    // Energy Level 1
    { energy_level_id: 1, verse_text: 'Come to me, all who labor and are heavy laden, and I will give you rest.', reference: 'Matthew 11:28', bible_version: 'NIV' },
    { energy_level_id: 1, verse_text: 'The Lord is near to the brokenhearted and saves the crushed in spirit.', reference: 'Psalm 34:18', bible_version: 'NIV' },

    // Energy Level 2
    { energy_level_id: 2, verse_text: 'The Lord is my strength and my shield; in him my heart trusts, and I am helped.', reference: 'Psalm 28:7', bible_version: 'NIV' },
    { energy_level_id: 2, verse_text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.', reference: 'Psalm 23:4', bible_version: 'NIV' },

    // Energy Level 3
    { energy_level_id: 3, verse_text: 'I can do all things through him who strengthens me.', reference: 'Philippians 4:13', bible_version: 'NIV' },
    { energy_level_id: 3, verse_text: 'For God gave us a spirit not of fear but of power and love and self-control.', reference: '2 Timothy 1:7', bible_version: 'NIV' },

    // Energy Level 4
    { energy_level_id: 4, verse_text: 'But those who hope in the Lord will renew their strength.', reference: 'Isaiah 40:31', bible_version: 'NIV' },
    { energy_level_id: 4, verse_text: 'Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.', reference: 'Joshua 1:9', bible_version: 'NIV' },

    // Energy Level 5
    { energy_level_id: 5, verse_text: 'Let everything that has breath praise the Lord! Praise the Lord!', reference: 'Psalm 150:6', bible_version: 'NIV' },
    { energy_level_id: 5, verse_text: 'Shout for joy to the Lord, all the earth, burst into jubilant song with music.', reference: 'Psalm 98:4', bible_version: 'NIV' }
  ]);
};

const seedIndoorActivities = async (knex) => {
  await knex('indoor_activities').del();

  await knex('indoor_activities').insert([
    { energy_level_id: 1, activity_name: 'Meditation', description: 'Meditation or prayer session', icon: 'fa-solid fa-meditation' },
    { energy_level_id: 1, activity_name: 'Bible Reading', description: 'Reading or listening to Bible verses', icon: 'fa-solid fa-book-bible' },
    { energy_level_id: 1, activity_name: 'Calm Worship Music', description: 'Listening to calm worship music', icon: 'fa-solid fa-music' },
    { energy_level_id: 1, activity_name: 'Journaling', description: 'Journaling or reflecting on gratitude', icon: 'fa-solid fa-pen' },

    { energy_level_id: 2, activity_name: 'Light Yoga', description: 'Light yoga with worship music', icon: 'fa-solid fa-person-yoga' },
    { energy_level_id: 2, activity_name: 'Short Devotionals', description: 'Reading short devotionals or Bible stories', icon: 'fa-solid fa-book-open' },
    { energy_level_id: 2, activity_name: 'Tea Time', description: 'Enjoying a cup of tea or your favorite snack', icon: 'fa-solid fa-mug-hot' },

    { energy_level_id: 3, activity_name: 'Home Workout', description: 'Home workout or dancing to worship music', icon: 'fa-solid fa-dumbbell' },
    { energy_level_id: 3, activity_name: 'Inspirational Book', description: 'Reading an inspirational Christian book', icon: 'fa-solid fa-book' },
    { energy_level_id: 3, activity_name: 'Baking', description: 'Baking simple treats like cookies', icon: 'fa-solid fa-cookie' },

    { energy_level_id: 4, activity_name: 'Intense Workout', description: 'Intense workout with upbeat worship music', icon: 'fa-solid fa-running' },
    { energy_level_id: 4, activity_name: 'Creative Projects', description: 'Painting or creative projects with worship music', icon: 'fa-solid fa-paintbrush' },
    { energy_level_id: 4, activity_name: 'Cooking for Loved Ones', description: 'Cooking a meal for loved ones', icon: 'fa-solid fa-utensils' },

    { energy_level_id: 5, activity_name: 'HIIT Workout', description: 'High-intensity interval training with energetic worship music', icon: 'fa-solid fa-stopwatch' },
    { energy_level_id: 5, activity_name: 'Praise Session', description: 'Hosting a praise and worship session with friends', icon: 'fa-solid fa-guitar' },
    { energy_level_id: 5, activity_name: 'Event Planning', description: 'Planning a faith-based event or outreach', icon: 'fa-solid fa-calendar' }
  ]);
};

const seedOutdoorActivities = async (knex) => {
  await knex('outdoor_activities').del();

  await knex('outdoor_activities').insert([
    { energy_level_id: 1, activity_name: 'Mindful Walk', description: 'A slow walk around the park', icon: 'fa-solid fa-walking', event_id: null },
    { energy_level_id: 1, activity_name: 'Peaceful Reflection', description: 'Sitting by a peaceful body of water', icon: 'fa-solid fa-water', event_id: null },
    { energy_level_id: 1, activity_name: 'Café Visit', description: 'Visiting a cozy café for tea or dessert', icon: 'fa-solid fa-coffee', event_id: null },

    { energy_level_id: 2, activity_name: 'Short Walk', description: 'A short walk on a nature trail', icon: 'fa-solid fa-tree', event_id: null },
    { energy_level_id: 2, activity_name: 'Outdoor Café', description: 'Visiting a local outdoor café or restaurant', icon: 'fa-solid fa-umbrella-beach', event_id: null },
    { energy_level_id: 2, activity_name: 'Outdoor Board Games', description: 'Playing light outdoor board games', icon: 'fa-solid fa-chess-board', event_id: null },

    { energy_level_id: 3, activity_name: 'Brisk Walk', description: 'A brisk walk or light jogging', icon: 'fa-solid fa-person-running', event_id: null },
    { energy_level_id: 3, activity_name: 'Mini-Golf', description: 'Playing mini-golf with friends', icon: 'fa-solid fa-golf-ball-tee', event_id: null },
    { energy_level_id: 3, activity_name: 'Exploring a New Café', description: 'Exploring a new café or restaurant', icon: 'fa-solid fa-coffee-to-go', event_id: null },

    { energy_level_id: 4, activity_name: 'Hiking', description: 'Hiking on a moderately challenging trail', icon: 'fa-solid fa-mountain', event_id: null },
    { energy_level_id: 4, activity_name: 'Bouldering', description: 'Bouldering or rock climbing', icon: 'fa-solid fa-hand-rock', event_id: null },
    { energy_level_id: 4, activity_name: 'Outdoor Sports', description: 'Playing outdoor sports like tennis or basketball', icon: 'fa-solid fa-basketball-ball', event_id: null },

    { energy_level_id: 5, activity_name: 'Trail Run', description: 'Going on a challenging hike or trail run', icon: 'fa-solid fa-running', event_id: null },
    { energy_level_id: 5, activity_name: 'Team Sports', description: 'Playing team sports like soccer or basketball', icon: 'fa-solid fa-futbol', event_id: null },
    { energy_level_id: 5, activity_name: 'Exploring New Restaurant', description: 'Exploring adventurous food spots', icon: 'fa-solid fa-utensils', event_id: null }
  ]);
};

const seedReflections = async (knex) => {
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

export async function seed(knex) {
  await seedEnergyLevels(knex);
  await seedBibleVerses(knex);
  await seedIndoorActivities(knex);
  await seedOutdoorActivities(knex);
  await seedReflections(knex);
}
