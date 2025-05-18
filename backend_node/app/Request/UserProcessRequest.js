const { StatusCodes } = require('http-status-codes');
const validator = require('validator');
const Log = require('../Utils/Log');
const RequestUtils = require('../Utils/RequestUtils');

class UserProcessRequest {

    static list(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.params, ['email']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            req.params.email = req.params.email.toLowerCase().trim();

            const checagemEmail = RequestUtils.checagemEmail(req.params.email);

            if (checagemEmail.code !== StatusCodes.OK) return res.status(checagemEmail.code).send({ error: checagemEmail.message });

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao executar ação, por favor, tente novamente mais tarde.' });

        }
    }

    static getUserByToken(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.params, ['token']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao busrcar usuário, por favor, tente novamente mais tarde.' });

        }
    }

    static list(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['email', 'codigo']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao verificar código, por favor, tente novamente mais tarde.' });

        }
    }
    static createTelefone(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['telefone']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            if (!req.usuario && !req.body.token) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'É necessário informar o token.' });
            }

            if (!validator.isMobilePhone(req.body.telefone, 'pt-BR')) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Número de telefone inválido' });
            }

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao criar telefone, por favor, tente novamente mais tarde.' });

        }
    }

    static verifyTelefone(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['telefone', 'codigo']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            if (!validator.isMobilePhone(req.body.telefone, 'pt-BR')) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Número de telefone inválido' });
            }

            if (!req.usuario && !req.body.token) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'É necessário informar o token.' });
            }

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao verificar telefone, por favor, tente novamente mais tarde.' });

        }
    }

    static login(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['email', 'senha']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemEmail = RequestUtils.checagemEmail(req.body.email);

            if (checagemEmail.code !== StatusCodes.OK) return res.status(checagemEmail.code).send({ error: checagemEmail.message });

            req.body.manterSessao = req.body.manter_sessao;

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao executar login, por favor, tente novamente mais tarde.' });

        }
    }

    static recuperarSenha(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['email']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemEmail = RequestUtils.checagemEmail(req.body.email);

            if (checagemEmail.code !== StatusCodes.OK) return res.status(checagemEmail.code).send({ error: checagemEmail.message });

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao recuperar senha, por favor, tente novamente mais tarde.' });

        }
    }

    static novaSenha(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['senha', 'nova_senha', 'token']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            if (req.body.senha !== req.body.nova_senha) return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Senhas não coincidem.' });

            req.body.novaSenha = req.body.nova_senha;

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao salvar senha, por favor, tente novamente mais tarde.' });

        }
    }

    static getUsuario(req, res, next) {
        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['usuario_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.query, ['usuario_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.query.usuarioId = req.query.usuario_id;

            next();

        } catch (err) {

            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao buscar usuário, por favor, tente novamente mais tarde.' });

        }
    }

    static listar(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['limit', 'offset']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.query, ['limit', 'offset']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao listar usuários, por favor, tente novamente mais tarde.' });
        }
    }

    static pesquisar(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['keyword']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao pesquisar usuários, por favor, tente novamente mais tarde.' });
        }
    }

    static alterarSenha(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['old_pass', 'new_pass', 're_new_pass', 'user_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['user_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.body.oldPass = req.body.old_pass;
            req.body.newPass = req.body.new_pass;
            req.body.reNewPass = req.body.re_new_pass;
            req.body.userId = req.body.user_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao alterar a senha, por favor, tente novamente mais tarde.' });
        }
    }
}

module.exports = UserProcessRequest;
