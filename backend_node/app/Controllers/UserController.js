const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const UserService = require('../Services/UserService');
const JwtSecret = require('../Enums/JwtSecret');
const Log = require('../Utils/Log');

class UserController {

    static async register(req, res) {

        try {

            const user = await UserService.get(req.body.email);

            if (user) {
                 return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User alread exist.' });
            }

            req.body.hashed_password = await bcrypt.hash(req.body.password, 10);

            await UserService.create(req.body);

            return res.status(StatusCodes.OK).json();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu uma falha, por favor tente novamente mais tarde.' });
        }
    }

    static gerarToken(params = {}) {

        return jwt.sign(params, JwtSecret);

    }

    static async login(req, res) {

        if (!JwtSecret) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'JWT_SECRET não definido.' });
        }
        
        const user = await UserService.get(req.body.email);

        if (!user) return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Usuário não encontrado.' });

        if (!await bcrypt.compare(req.body.password, user.hashed_password)) {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Senha inválida.' });
        }

        const tokenAuth = UserController.gerarToken({ id: user.id });

        return res.send({ tokenAuth });

    }

}

module.exports = UserController;
