require("dotenv").config();
const knex = require("knex");

module.exports = {
  knex: knex({
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  }),
};
