const {
  getParent,
  getParentStudents,
  parentUpdate
} = require('./parents.services');

const {
  studentSignUp,
  getAllStudents
} = require('../students/students.services');

const resolvers = {
  Query: {
    getParent,
    getParentStudents,
    getAllStudents
  },
  Mutation: {
    parentUpdate,
    studentSignUp
  }
};

module.exports = {
  resolvers
};
