const { StatusCodes } = require('http-status-codes');

const ScrapedDataService = require('../Services/ScrapedDataService');

const Log = require('../Utils/Log');

class ScrapedDataController {

    static async list(req, res) {

        try {

            const { limit, offset } = req.query;

            const scrapedDatas = await ScrapedDataService.list(limit, offset);

            return res.status(StatusCodes.OK).json({ scrapedDatas });

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao listar, por favor, tente novamente mais tarde.' });
        }

    }

}

module.exports = ScrapedDataController;
