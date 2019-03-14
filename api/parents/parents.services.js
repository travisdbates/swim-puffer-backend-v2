const config = require('../../config');
// const db = require('monk')(config.mongo_uri);
// const knex = require('knex');
// const db = knex(config.db);
const { knex } = require('../../utils/db');
const util = require('util');
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
    return temp.map(student => {
      return {
        ...student,
        id: student.studentId
      };
    });
  } catch (err) {
    winston.error(err);
  }
};

const parentUpdate = async (_, args, ctx) => {
  const { email, firstName, lastName, phone } = args;
  try {
    const insert = knex('parents')
      .insert({ email, firstName, lastName, phone })
      .toString();
    const update = knex('parents')
      .update({ email, firstName, lastName, phone })
      .whereRaw(`parents.email = '${email}'`)
      .returning('*');
    const query = util.format(
      '%s ON CONFLICT (email) DO UPDATE SET %s',
      insert.toString(),
      update.toString().replace(/^update\s.*\sset\s/i, '')
    );
    let parent = await knex.raw(query);
    winston.info(parent.rows[0]);
    return parent.rows[0];
  } catch (err) {
    winston.error(err);
  }
};

module.exports = {
  getParent,
  getParentStudents,
  parentUpdate
};
