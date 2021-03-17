module.exports = {
  environment: process.env.NODE_ENV,
  mongo_uri: process.env.MONGODB_URI || 'localhost:27017/swimpuffer',
  pg_uri: process.env.DATABASE_URL,
  db: {
    development: {
      client: 'pg',
      connection:
        'postgres://qsfsncimlfqwhv:29df482218cc224adc529b72552037d5671779364811b2021929cfe4b34f1499@ec2-107-20-167-11.compute-1.amazonaws.com:5432/d35s6bnp81deej?ssl=true'
    },
    production: { client: 'pg', connection: process.env.DATABASE_URL }
  },
  knexConfig: {
    client: 'pg',
    connection:
      process.env.NODE_ENV === 'production'
        ? 'postgres://jejtrbxzoqxaar:4f84c5b6337a273b8e38a7221304f5f846e5448f2a1551225f1dd2b0b36999a3@ec2-107-20-167-11.compute-1.amazonaws.com:5432/d3ikgsrm5c5n6s?ssl=true'
        : 'postgres://qsfsncimlfqwhv:29df482218cc224adc529b72552037d5671779364811b2021929cfe4b34f1499@ec2-107-20-167-11.compute-1.amazonaws.com:5432/d35s6bnp81deej?ssl=true',
    ssl: true
  }
};
