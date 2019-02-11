const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Parent {
    firstName: String
    lastName: String
    fullName: String
    email: String!
    phone: String
  }

  type Query {
    parent(email: String): Parent!
  }
`;

module.exports = { typeDefs };
