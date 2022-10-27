/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('process')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('process').insert([
        { pid: 11, pname: "P1", arr_time: 0, exe_time: 1},
        { pid: 233, pname: "P2", arr_time: 1, exe_time: 4},
        { pid: 45, pname: "P3", arr_time: 3, exe_time: 5},        
      ]);
    });
};
