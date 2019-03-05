const {
  getParent,
  getParentStudents,
  parentUpdate
} = require('./parents.services');

const { studentSignUp } = require('../students/students.services');

const resolvers = {
  Query: {
    getParent,
    getParentStudents
  },
  Mutation: {
    parentUpdate,
    studentSignUp
  }
};

module.exports = {
  resolvers
};
