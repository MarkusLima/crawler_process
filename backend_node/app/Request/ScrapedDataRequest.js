const { StatusCodes } = require('http-status-codes');

const Log = require('../Utils/Log');
const RequestUtils = require('../Utils/RequestUtils');

class ScrapedDataRequest {

    static list(req, res, next) {

        try {

            const checkRequired = RequestUtils.checkRequired(req.query, ['limit', 'offset']);

            if (checkRequired.code !== StatusCodes.OK) {
                return res.status(checkRequired.code).json({ error: checkRequired.message });
            }

            const checkInt = RequestUtils.checkInt(req.query, ['limit', 'offset']);

            if (checkInt.code !== StatusCodes.OK) {
                return res.status(checkInt.code).json({ error: checkInt.message });
            }

            next();

        } catch (error) {

            Log.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao trocar status, por favor, tente novamente mais tarde.' });

        }
    }

}

module.exports = ScrapedDataRequest;
