
const path = require('path');

const SERVER_PORT = process.env.REACT_APP_PORT;


const SERVER_CONFIGS = {
  PRODUCTION: process.env.REACT_APP_NODE_ENV === 'production',
  PORT: process.env.PORT || SERVER_PORT,
};

module.exports = SERVER_CONFIGS;