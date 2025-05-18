const { StatusCodes } = require('http-status-codes');
const Log = require('../Utils/Log');

class UserProcessController {

    static async list(req, res) {
        try {

            // const tribunais = await TribunalService.getAll();

            // return res.status(StatusCodes.OK).json({ tribunais });

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Não foi possível obter a lista de tribunais.' });
        }
    }

}

module.exports = UserProcessController;
