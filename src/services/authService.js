const jwt = require('jsonwebtoken');

const secret = 'senhaImpossivel123';

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, secret, JWT_CONFIG);

module.exports = {
  genToken,
  secret,
};
