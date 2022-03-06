require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const { winston } = require("./utils");
const { typeDefs } = require("./api/schemas");
const { resolvers } = require("./api/parents/parents.resolvers");
const jwt = require("jsonwebtoken");

const app = express();

// const typeDefs = gql`
//   type Query {
//     launches: String!
//   }
// `;

// A map of functions which return data for the schema.
// const resolvers = {
//   Query: {
//     launches: () => 'world'
//   }
// };

server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    try {
      let { email } = jwt.decode(req.headers.id);
      return {
        headers: {
          ...req.headers,
          email,
        },
      };
    } catch (err) {
      winston.error(err);
    }
  },
});
server.applyMiddleware({ app });

app.use(cors());
app.options("/graphql", cors());
app.use(express.json());

let port = process.env.PORT || 4000;
app.listen({ port }, () => winston.info(`🚀 Server ready at ${port}`));

app.get("/helloworld", (req, res, next) => {
  res.status(200).send("Hello world!");
});
