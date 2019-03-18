const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Parent {
    firstName: String
    lastName: String
    fullName: String
    email: String!
    phone: String
    admin: Boolean
  }

  type Students {
    firstName: String
    sessionPreference: String
    timePreference: String
    sessionAssigned: String
    timeAssigned: String
    sideAssigned: String
    age: Int
    created_at: String
    email: String
    id: ID
    notes: String
    emailSent: Boolean
    parentFirst: String
    parentLast: String
    phone: String
  }

  type Message {
    status: String!
    message: String!
  }

  type Query {
    getParent(email: String!): Parent
    getParentStudents(email: String!): [Students]
    getAllStudents: [Students]
  }
  type Mutation {
    parentUpdate(
      email: String!
      firstName: String
      lastName: String
      phone: String
    ): Parent!
    studentSignUp(
      email: String!
      firstName: String!
      sessionPreference: [Boolean]!
      timePreference: [Int]!
      notes: [String]
      age: Int
    ): Message!
    studentUpdate(
      id: ID
      email: String!
      firstName: String!
      sessionPreference: Int!
      age: Int
      timeAssigned: Int
      sessionAssigned: Int
      sideAssigned: String
      emailSent: Boolean
    ): Students!
  }
`;

module.exports = { typeDefs };
