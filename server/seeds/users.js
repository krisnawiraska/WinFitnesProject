/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const currentDate = new Date()
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {name: 'krisna', no_hp:'081239959322',address:'denpasar',email:'krisna@mail.com',password:'ada',date_start_member:null,date_end_member:null,status:'non_active',role:'customer',created_at: currentDate, updated_at: currentDate}

  ]);
};
