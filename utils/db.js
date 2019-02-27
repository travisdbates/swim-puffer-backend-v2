const { knexConfig } = require('../config');
const knex = require('knex');

module.exports = {
  knex: knex(knexConfig)
};
