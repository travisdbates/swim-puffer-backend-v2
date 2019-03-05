const jwt = require('jsonwebtoken');

module.exports = req => {
  let { email } = jwt.decode(req.headers.id);
  return {
    headers: {
      ...req.headers,
      email
    }
  };
};
