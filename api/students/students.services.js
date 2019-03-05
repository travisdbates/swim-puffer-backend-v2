const { knex } = require('../../utils/db');
const { winston } = require('../../utils');

const studentSignUp = async (_, args, ctx) => {
  const { email, firstName, sessionPreference, timePreference, notes } = args;
  winston.info({ email, firstName, sessionPreference, timePreference, notes });
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
  studentSignUp
};
