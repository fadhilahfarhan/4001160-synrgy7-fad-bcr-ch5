import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('cars').del();

  // Inserts seed entries
  await knex('cars').insert([
    {
      name: 'Honda Camry',
      price: 50000000,
      picture: 'https://res.cloudinary.com/dmayoj4q1/image/upload/v1716699567/i0nya0j6wy7wlnslrgcj.png',
      start_rent: '2024-05-30 12:14:00',
      finish_rent: '2024-06-20 12:14:00',
      created_at: '2024-05-15 15:47:25',
      updated_at: '2024-05-16 08:59:28',
    },
    {
      name: 'Bugatti Veyron',
      price: 70000000,
      picture: 'https://res.cloudinary.com/dmayoj4q1/image/upload/v1716699567/i0nya0j6wy7wlnslrgcj.png',
      start_rent: '2024-05-30 12:14:00',
      finish_rent: '2024-06-20 12:14:00',
      created_at: '2024-05-15 15:47:25',
      updated_at: '2024-05-16 08:59:28',
    },
    {
      name: 'Ferrari 458 Italy',
      price: 5774000,
      picture: 'https://res.cloudinary.com/dmayoj4q1/image/upload/v1716699567/i0nya0j6wy7wlnslrgcj.png',
      start_rent: '2024-05-30 12:14:00',
      finish_rent: '2024-06-20 12:14:00',
      created_at: '2024-05-15 15:47:25',
      updated_at: '2024-05-16 08:59:28',
    },
  ]);
}
