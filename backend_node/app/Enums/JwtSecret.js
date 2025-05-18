const Ambiente = require('./Ambiente');

const JwtSecret = (process.env.NODE_ENV === Ambiente.TEST) ? 'abc' : process.env.SECRET;

module.exports = JwtSecret;
