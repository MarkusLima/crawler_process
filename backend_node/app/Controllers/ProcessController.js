const { StatusCodes } = require('http-status-codes');
const ProcessService = require('../Services/ProcessService');
const Log = require('../Utils/Log');

class ProcessController {

    static async list(req, res) {

        try {

            const { keyword, date_initial, date_finish}=req.query;

            const processes = await ProcessService.list(keyword, date_initial, date_finish);

            return res.status(StatusCodes.OK).json({ processes });

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao listar, por favor, tente novamente mais tarde.' });
        }

    }

    static async update(req, res) {

        try {

            const { id } = req.params;
            const { status } = req.body;

            const processExists = await ProcessService.findById(id);
            if (!processExists) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Processo não encontrado.' });
            }

            console.log('status', status);
            
            if (status !=='nova' && status !== "lida" && status !== 'enviar' && status !== 'concluido') {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Status inválido.' });
            }

            await ProcessService.updateStatus(id, status);

            return res.status(StatusCodes.OK).json();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao atualizar, por favor, tente novamente mais tarde.' });
        }

    }

}

module.exports = ProcessController;
