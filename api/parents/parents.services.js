const config = require('../../config');
// const db = require('monk')(config.mongo_uri);
// const knex = require('knex');
// const db = knex(config.db);
const { knex } = require('../../utils/db');
const { winston } = require('../../utils');

const getParent = async (_, { email }, ctx) => {
  try {
    let temp = await knex('parents')
      .where({ email })
      .first();
    return temp;
  } catch (err) {
    winston.error(err);
  }
};

const getParentStudents = async (_, { email }, ctx) => {
  try {
    let temp = await knex('students').where({ email });
    return temp;
  } catch (err) {
    winston.error(err);
  }
};

const parentUpdate = async (_, args, ctx) => {
  try {
    let parent = await db.collection('parents').findOne({ email: args.email });
    return await db.collection('parents').findOneAndUpdate(
      {
        email: args.email
      },
      {
        ...parent,
        ...args
      }
    );
  } catch (err) {
    winston.error(err);
  }
};

const studentSignUp = async (_, args, ctx) => {
  const { email, firstName, sessionPreference, timePreference, notes } = args;
  console.log('\x1b[1m', '\x1b[31m', args, '\x1b[0m');
  try {
    await sessionPreference.map(async (session, index) => {
      session &&
        (await knex('students').insert({
          email,
          firstName,
          sessionPreference: index + 1,
          timePreference: timePreference[index],
          notes: notes[index]
        }));
    });
    return {
      message: 'Successfully submitted',
      status: 'success'
    };
  } catch (err) {
    winston.error(err);
    return {
      message: 'Error adding child',
      status: 'error'
    };
  }
};

module.exports = {
  getParent,
  getParentStudents,
  parentUpdate,
  studentSignUp
};
