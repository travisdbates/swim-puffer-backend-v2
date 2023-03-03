require("dotenv").config();
const knex = require("knex");

console.log("DB: ", process.env.DATABASE_URL);

module.exports = {
  knex: knex({
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  }),
};
