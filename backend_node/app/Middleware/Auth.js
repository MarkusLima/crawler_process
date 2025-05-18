const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const UserService = require('../Services/UserService');

const JwtSecret = require('../Enums/JwtSecret');

async function verificarToken(authHeader) {

    if (!authHeader) return { valid: false, message: 'Token não informado.' };

    const parts = authHeader.split(' ');

    if (!parts.length === 2) return { valid: false, message: 'Erro no token.' };

    const [scheme, token] = parts;

    if (scheme !== 'Bearer') return { valid: false, message: 'Token no formato incorreto.' };

    let response = {};

    await jwt.verify(token, JwtSecret, async (err, decoded) => {

        if (err) response = { valid: false, message: 'Sessão expirada, por favor, faça login novamente.' };
        else {

            const usuario = await UserService.getById(decoded.id);

            if (!usuario) response = { valid: false, message: 'Usuário inválido.' };
            else response = { valid: true, usuario };

        }

    });

    return response;

}

async function verificarApiKey(apiKey) {

    // const api = await ApiService.getByKey(apiKey);

    // if (!api) return { valid: false, message: 'API Key inválida.' };

    // return { valid: true, usuario: api.usuario, api };

}

async function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;
    const { api_key: apiKey } = req.query;

    let response = {};

    if (apiKey) {

        response = await verificarApiKey(apiKey);

    } else response = await verificarToken(authHeader);

    const {
        valid, message, usuario, api,
    } = response;

    if (!valid) return res.status(StatusCodes.UNAUTHORIZED).send({ error: message });

    req.usuario = usuario;

    if (api) req.api = api;

    return next();

}

module.exports = { authMiddleware, verificarToken };
