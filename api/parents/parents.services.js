const config = require('../../config');
const db = require('monk')(config.mongo_uri);

const parent = async (_, { email }, ctx) => {
  return await db.collection('parents').findOne({
    email
  });
};

module.exports = {
  parent
};
