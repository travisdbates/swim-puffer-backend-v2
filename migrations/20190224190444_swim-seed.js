const faker = require('faker');
exports.up = async knex => {
  await knex.schema.createTableIfNotExists('sessions', function(table) {
    table.increments('sessionId');
    table.integer('sessionNumber');
    table.integer('sessionCost');
    table.timestamp('startDate');
    table.timestamp('endDate');
    table.boolean('active');
  });
  await knex.schema.createTableIfNotExists('parents', function(table) {
    table.increments('parentId');
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('firstName');
    table.string('lastName');
    table.string('fullName');
    table.string('phone');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  });
  await knex.schema.createTableIfNotExists('students', function(table) {
    table.increments('studentId');
    table.string('email').notNullable();
    table.string('firstName');
    table.string('lastName');
    table.string('fullName');
    table.integer('sessionPreference');
    table.integer('sessionAssigned');
    table.string('notes');
    table.integer('timePreference');
    table.integer('timeAssigned');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  });
  await knex('parents').insert([
    {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'Tester',
      fullName: 'Test Tester',
      phone: '8011231234'
    }
  ]);

  for (let i = 0; i < 500; i++) {
    await knex('students').insert([
      {
        email: 'test@test.com',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sessionPreference: Math.floor(Math.random() * 6) + 1,
        timePreference: Math.floor(Math.random() * 3) + 1,
        notes: faker.lorem.sentence()
      }
    ]);
  }
};

exports.down = async knex => {
  await knex.schema.dropTable('parents');
  await knex.schema.dropTable('students');
  await knex.schema.dropTable('sessions');
};
