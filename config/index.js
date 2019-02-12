module.exports = {
  environment: process.env.NODE_ENV,
  mongo_uri: process.env.MONGODB_URI || 'localhost:27017/swimpuffer'
};
