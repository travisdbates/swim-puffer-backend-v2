const { parent } = require('./parents.services');

const resolvers = {
  Query: {
    parent
  }
};

module.exports = {
  resolvers
};
