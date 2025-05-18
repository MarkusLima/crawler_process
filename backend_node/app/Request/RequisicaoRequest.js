const { StatusCodes } = require('http-status-codes');
const validator = require('validator');

const { StatusRequisicao } = require('../Enums/Requisicao/StatusRequisicao');

const CNJ = require('../Utils/CNJ');
const DateUtility = require('../Utils/DateUtility');
const Log = require('../Utils/Log');
const RequestUtils = require('../Utils/RequestUtils');

class RequisicaoRequest {

    static vouFazer(req, res, next) {

        try {

            // Verifica se dentro do req.body tem a chave req_id
            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['req_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['req_id']);

            // Se não for um array e não for inteiro
            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao executar ação, por favor, tente novamente mais tarde.' });
        }
    }

    static filaPedidos(req, res, next) {

        try {

            let offset = parseInt(req.query.offset);
            let limit = parseInt(req.query.limit);

            // Se o que for enviado no offset não for um numero, por default ele será X
            if (!Number.isInteger(offset)) offset = 0;

            // Se o que for enviado no limit não for um numero, por default ele será X
            if (!Number.isInteger(limit)) limit = 50;

            // Se o que for enviado no limit maior que X, por default ele será X
            if (limit > 500) limit = 500;

            // Se o que for enviado no limit menor que X, por default ele será X
            if (limit < 50) limit = 50;

            req.query.offset = offset;
            req.query.limit = limit;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao listar a fila de pedidos, por favor, tente novamente mais tarde.' });
        }
    }

    static disponibilizarDropbox(req, res, next) {

        const camposObrigatorios = ['folhas', 'processoId'];

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, camposObrigatorios);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, camposObrigatorios);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            if (req.body.folhas <= 1) {
                return res.status(StatusCodes.BAD_REQUEST)
                    .send({ error: 'Prezado, o campo folhas precisa ser maior que 1.' });
            }

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao executar disponibilizar dropbox, por favor, tente novamente mais tarde.' });
        }
    }

    static fixar(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['ids']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            if (!Array.isArray(req.body.ids)) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Por favor, forneça os ids de requisições em uma lista.' });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['ids']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao executar ação fixar, por favor, tente novamente mais tarde.' });
        }
    }

    static listar(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['user_id', 'offset', 'limit']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.query, ['user_id', 'offset', 'limit']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            if (req.query.user_id !== req.usuario.id) return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Usuário não autorizado.' });

            req.query.userId = req.query.user_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao listar as requisições, por favor, tente novamente mais tarde.' });
        }
    }

    static getToDownload(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['token']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao listar os downloads, por favor, tente novamente mais tarde.' });
        }

    }

    static forcarAtualizacao(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['req_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['req_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.body.id = req.body.req_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao forçar a atualização, por favor, tente novamente mais tarde.' });
        }
    }

    static pesquisarAdmin(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['keyword']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            if (!validator.isEmail(req.query.keyword) && !CNJ.isNumeroProcessoValido(req.query.keyword)) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Por favor, informe um número de processo ou e-mail válido.' });
            }

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao pesquisar as requisições, por favor, tente novamente mais tarde.' });
        }
    }

    static ranking(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['data_fim', 'data_inicio']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            // Verifica se as datas são válidas
            if (!DateUtility.isValidDate(req.query.data_inicio) || !DateUtility.isValidDate(req.query.data_fim)) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Data inválida.' });
            }
            // Coloca dataInicio para o início do dia
            const dataInicio = DateUtility.setStartOfDay(req.query.data_inicio);

            // Coloca a dataFim para o final do dia
            const dataFim = DateUtility.setEndOfDay(req.query.data_fim);

            // Verifica se a dataFim é maior que a dataInicio
            if (DateUtility.getDifferenceBetweenDates(dataInicio, dataFim, 'days') < 0) {
                return res.status(StatusCodes.BAD_REQUEST)
                    .send({ error: 'A data final deve ser maior que a data inicial.' });
            }
            // Verifica se o período é maior que 3 meses
            if (DateUtility.getDifferenceBetweenDates(dataInicio, dataFim, 'months') > 3) {
                return res.status(StatusCodes.BAD_REQUEST)
                    .send({ error: 'O período não pode ser maior que 3 meses.' });
            }

            req.query.dataInicio = dataInicio;
            req.query.dataFim = dataFim;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao pesquisar as requisições, por favor, tente novamente mais tarde.' });
        }
    }

    static criarAdmin(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['user_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['user_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.body.userId = req.body.user_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao criar o usuário, por favor, tente novamente mais tarde.' });
        }
    }

    static mudarStatus(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['reqs_ids', 'status']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['reqs_ids', 'status']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            const statusValidos = [
                StatusRequisicao.EM_FILA,
                StatusRequisicao.EM_EXECUCAO,
                StatusRequisicao.CANCELADA,
                StatusRequisicao.PROCESSO_FISICO,
                StatusRequisicao.NUMERACAO_INCORRETA,
                StatusRequisicao.SEGREDO_DE_JUSTICA,
                StatusRequisicao.PROCESSO_NAO_LOCALIZADO,
                StatusRequisicao.TRIBUNAL_NAO_ATENDIDO,
                StatusRequisicao.SISTEMA_OFF,
            ];

            if (!statusValidos.includes(req.body.status)) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Não é permitido alterar para o status selecionado.' });
            }

            req.body.ids = req.body.reqs_ids;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao mudar o status, por favor, tente novamente mais tarde.' });
        }
    }

    static voltarParaFila(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['req_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['req_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.body.id = req.body.req_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao voltar para a fila, por favor, tente novamente mais tarde.' });
        }
    }

    static emailFinalizacao(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['req_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['req_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.body.id = req.body.req_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao voltar para a fila, por favor, tente novamente mais tarde.' });
        }
    }

    static robsonFlag(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['req_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['req_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.body.id = req.body.req_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao executar ação, por favor, tente novamente mais tarde.' });
        }
    }

    static obterAdmin(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['req_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.query, ['req_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.query.id = req.query.req_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao obter a requisição, por favor, tente novamente mais tarde.' });
        }
    }

    static cancelar(req, res, next) {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.body, ['req_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.body, ['req_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.body.id = req.body.req_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao cancelar a requisição, por favor, tente novamente mais tarde.' });
        }
    }

    static pesquisar = (req, res, next) => {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['keyword']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            if (!validator.isEmail(req.query.keyword) && !CNJ.isNumeroProcessoValido(req.query.keyword)) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Por favor, informe um número de processo ou e-mail válido.' });
            }

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao pesquisar as requisições, por favor, tente novamente mais tarde.' });
        }
    };

    static obter = (req, res, next) => {

        try {

            const checagemObrigatorios = RequestUtils.checagemObrigatorios(req.query, ['req_id']);

            if (checagemObrigatorios.code !== StatusCodes.OK) {
                return res.status(checagemObrigatorios.code).json({ error: checagemObrigatorios.message });
            }

            const checagemInteiros = RequestUtils.checagemInteiros(req.query, ['req_id']);

            if (checagemInteiros.code !== StatusCodes.OK) {
                return res.status(checagemInteiros.code).json({ error: checagemInteiros.message });
            }

            req.query.id = req.query.req_id;

            next();

        } catch (err) {
            Log.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Ocorreu um erro ao obter a requisição, por favor, tente novamente mais tarde.' });
        }
    };

}

module.exports = RequisicaoRequest;
