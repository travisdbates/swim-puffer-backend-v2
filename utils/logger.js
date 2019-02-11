const winston = require('winston');
require('winston-loggly-bulk');
const config = require('../config');

if (config.environment === 'production') {
  winston.add(winston.transports.Loggly, {
    inputToken: '5f15a21d-ecfb-4569-aee2-b77a8c76ed70',
    subdomain: 'travisdbates',
    tags: ['swim-puffer-backend'],
    json: true
  });
}

module.exports = { winston };
