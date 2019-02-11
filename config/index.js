module.exports = {
  environment: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URI || 'localhost:27017/swimpuffer'
};
