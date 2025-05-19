const Ambiente = require('./Ambiente');

const JwtSecret = process.env.SECRET || 'qualquerumaserve';

module.exports = JwtSecret;
