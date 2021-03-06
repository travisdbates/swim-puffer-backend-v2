const {
  getParent,
  getParentStudents,
  parentUpdate
} = require('./parents.services');

const {
  studentSignUp,
  getAllStudents,
  studentUpdate
} = require('../students/students.services');

const resolvers = {
  Query: {
    getParent,
    getParentStudents,
    getAllStudents
  },
  Mutation: {
    parentUpdate,
    studentSignUp,
    studentUpdate
  }
};

module.exports = {
  resolvers
};
