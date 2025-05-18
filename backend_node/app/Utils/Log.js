const moment = require('./moment');

class Log {

    static info(message) {
        const timestamp = moment().format('DD/MM HH:mm:ss');
        console.log(`[${timestamp}] ${message}`);
        return true;
    }

    static error(message) {
        const timestamp = moment().format('DD/MM HH:mm:ss');
        console.error(`[${timestamp}] ${message}`);
        return true;
    }
}

module.exports = Log;
