// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection:
      'postgres://qsfsncimlfqwhv:29df482218cc224adc529b72552037d5671779364811b2021929cfe4b34f1499@ec2-107-20-167-11.compute-1.amazonaws.com:5432/d35s6bnp81deej?ssl=true'
  },
  production: {
    client: 'pg',
    connection:
      'postgres://jejtrbxzoqxaar:4f84c5b6337a273b8e38a7221304f5f846e5448f2a1551225f1dd2b0b36999a3@ec2-107-20-167-11.compute-1.amazonaws.com:5432/d3ikgsrm5c5n6s?ssl=true'
  }
};
