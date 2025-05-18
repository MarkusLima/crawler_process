const { StatusCodes } = require('http-status-codes');
const validator = require('validator');

const Log = require('../Utils/Log');
const RequestUtils = require('../Utils/RequestUtils');

class UserRequest {

    static register(req, res, next) {
        try {

            const checkRequired = RequestUtils.checkRequired(req.body, ['email', 'username', 'password', 'confirm_password']);

            if (checkRequired.code !== StatusCodes.OK) return res.status(checkRequired.code).json({ error: checkRequired.message });

            if (req.body.password !== req.body.confirm_password) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'As senhas não conferem.' });
            }

            req.body.email = req.body.email.toLowerCase().trim();

            const checkEmail = RequestUtils.checkEmail(req.body.email);

            if (checkEmail.code !== StatusCodes.OK) return res.status(checkEmail.code).send({ error: checkEmail.message });

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao executar ação, por favor, tente novamente mais tarde.' });

        }
    }

    static login(req, res, next) {
        try {

            const checkRequired = RequestUtils.checkRequired(req.body, ['email', 'password']);

            if (checkRequired.code !== StatusCodes.OK) {
                return res.status(checkRequired.code).json({ error: checkRequired.message });
            }

            const checkEmail = RequestUtils.checkEmail(req.body.email);

            if (checkEmail.code !== StatusCodes.OK) return res.status(checkEmail.code).send({ error: checkEmail.message });

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao executar login, por favor, tente novamente mais tarde.' });

        }
    }


}

module.exports = UserRequest;
