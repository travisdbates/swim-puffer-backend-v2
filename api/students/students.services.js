const { knex } = require('../../utils/db');
const { winston } = require('../../utils');
const { sendEmail } = require('../../mailControllers/AssignedCtrl');

const studentUpdate = async (_, args, ctx) => {
  const {
    email,
    firstName,
    sessionAssigned,
    timeAssigned,
    sessionPreference,
    notes,
    age,
    sideAssigned,
    emailSent
  } = args;
  winston.info('Update student: ', {
    email,
    firstName,
    age,
    sessionPreference,
    timeAssigned,
    sessionAssigned,
    sideAssigned,
    emailSent
  });
  try {
    if (age) {
      let updatedStudent = await knex('students')
        .where({
          email,
          firstName,
          sessionPreference
        })
        .update({
          age
        })
        .returning('*');
      updatedStudent = updatedStudent[0];
      return {
        ...updatedStudent,
        id: updatedStudent.studentId
      };
    } else if (timeAssigned) {
      let updatedStudent = await knex('students')
        .where({
          email,
          firstName,
          sessionPreference
        })
        .update({
          timeAssigned
        })
        .returning('*');
      updatedStudent = updatedStudent[0];
      return {
        ...updatedStudent,
        id: updatedStudent.studentId
      };
    } else if (sessionAssigned) {
      let updatedStudent = await knex('students')
        .where({
          email,
          firstName,
          sessionPreference
        })
        .update({
          sessionAssigned
        })
        .returning('*');
      updatedStudent = updatedStudent[0];
      return {
        ...updatedStudent,
        id: updatedStudent.studentId
      };
    } else if (sideAssigned) {
      let updatedStudent = await knex('students')
        .where({
          email,
          firstName,
          sessionPreference
        })
        .update({
          sideAssigned
        })
        .returning('*');
      updatedStudent = updatedStudent[0];
      return {
        ...updatedStudent,
        id: updatedStudent.studentId
      };
    } else if (emailSent) {
      let studentLookup = await knex('students')
        .where({
          email,
          firstName,
          sessionPreference
        })
        .returning('*')
        .first();
      let result = await sendEmail({
        email: args.email,
        childfirst: args.firstName,
        session_id: studentLookup.sessionAssigned,
        time: studentLookup.timeAssigned
      });
      winston.info('Sending email: ', {
        email: args.email,
        childfirst: args.firstName,
        session_id: studentLookup.sessionAssigned,
        time: studentLookup.timeAssigned
      });
      if (result) {
        winston.error(result);
        return {
          status: 'error',
          message: 'Not able to send email'
        };
      } else {
        let updatedStudent = await knex('students')
          .where({
            email,
            firstName,
            sessionPreference
          })
          .update({
            emailSent
          })
          .returning('*');
        return {
          ...updatedStudent,
          id: updatedStudent.studentId
        };
      }
    }
  } catch (err) {
    winston.error('Error updating student: ', err);
    return {
      message: 'Error adding child',
      status: 'error'
    };
  }
};

const studentSignUp = async (_, args, ctx) => {
  const {
    email,
    firstName,
    sessionPreference,
    timePreference,
    notes,
    age
  } = args;
  winston.info({
    email,
    firstName,
    sessionPreference,
    timePreference,
    notes,
    age
  });
  try {
    await sessionPreference.map(async (session, index) => {
      session &&
        (await knex('students').insert({
          email,
          firstName,
          sessionPreference: index + 1,
          timePreference: timePreference[index],
          notes: notes[index],
          age
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

const getAllStudents = async (_, args, ctx) => {
  try {
    let students = await knex('students')
      .join('parents', { 'parents.email': 'students.email' })
      .select(
        'students.studentId',
        'students.email',
        'students.firstName',
        'students.lastName',
        'students.fullName',
        'students.sessionPreference',
        'students.sessionAssigned',
        'students.timeAssigned',
        'students.timePreference',
        'students.emailSent',
        'students.notes',
        'parents.firstName as parentFirst',
        'parents.lastName as parentLast'
      );
    students = students.map(student => {
      return {
        ...student,
        id: student.studentId
      };
    });
    return students;
  } catch (err) {
    winston.error(err);
  }
};

module.exports = {
  studentSignUp,
  getAllStudents,
  studentUpdate
};
