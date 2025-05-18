// Configura o timezone padrão do moment para America/Sao_Paulo
const moment = require('moment-timezone');

moment.tz.setDefault('America/Sao_Paulo');

module.exports = moment;
