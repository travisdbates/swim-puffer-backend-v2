const {
  getParent,
  getParentStudents,
  parentUpdate,
  studentSignUp
} = require('./parents.services');

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
