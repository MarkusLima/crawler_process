const { StatusCodes } = require('http-status-codes');
const Log = require('../Utils/Log');
const RequestUtils = require('../Utils/RequestUtils');

class ProcessRequest {

     static list(req, res, next) {

        try {

            next();

        } catch (error) {

            Log.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao listar, por favor, tente novamente mais tarde.' });

        }
    }

    static update(req, res, next) {

        try {

            const checkRequired = RequestUtils.checkRequired(req.params, ['id']);

            if (checkRequired.code !== StatusCodes.OK) {
                return res.status(checkRequired.code).json({ error: checkRequired.message });
            }

            const checkInt = RequestUtils.checkInt(req.params, ['id']);

            if (checkInt.code !== StatusCodes.OK) {
                return res.status(checkInt.code).json({ error: checkInt.message });
            }

            const checkRequiredBody = RequestUtils.checkRequired(req.body, ['status']);
            if (checkRequiredBody.code !== StatusCodes.OK) {
                return res.status(checkRequiredBody.code).json({ error: checkRequiredBody.message });
            }

            const validateStatus = [
                { name: 'Nova Publicação', real: 'nova' },
                { name: 'Publicação Lida', real: 'lida' },
                { name: 'Enviar para Advogado Responsável', real: 'enviar' },
                { name: 'Concluído', real: 'concluido' }
            ];

            for (let i = 0; i < validateStatus.length; i++) {
                if (req.body.status === validateStatus[i].name) {
                    req.body.status = validateStatus[i].real;
                    break;
                }
            }

            next();

        } catch (error) {

            Log.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao atualizar, por favor, tente novamente mais tarde.' });

        }
    }

}

module.exports = ProcessRequest;
