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
    table.string('email').notNullable();
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
  await knex('students').insert([
    {
      email: 'test@test.com',
      firstName: 'Bobby',
      lastName: 'Bobberson',
      fullName: 'Bobby Bobberson',
      sessionPreference: 1,
      timePreference: 1,
      notes: 'Here are some notes for this child'
    },
    {
      email: 'test@test.com',
      firstName: 'Freddy',
      lastName: 'Fredderson',
      fullName: 'Freddy Fredderson',
      sessionPreference: 1,
      timePreference: 2,
      notes: 'Here are some notes for this child'
    },
    {
      email: 'test@test.com',
      firstName: 'Jimmy',
      lastName: 'Jimmerson',
      fullName: 'Jimmy Jimmerson',
      sessionPreference: 1,
      timePreference: 3,
      notes: 'Here are some notes for this child'
    }
  ]);
};

exports.down = async knex => {
  await knex.schema.dropTable('parents');
  await knex.schema.dropTable('students');
  await knex.schema.dropTable('sessions');
};
