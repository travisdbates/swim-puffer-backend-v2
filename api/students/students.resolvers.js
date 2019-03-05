const { studentSignUp } = require('./students.services');

const resolvers = {
  Query: {},
  Mutation: {
    studentSignUp
  }
};

module.exports = {
  resolvers
};
