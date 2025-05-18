const { StatusCodes } = require('http-status-codes');
const validator = require('validator');

const SubstituirChaveValor = require('../Enums/SubstituirChaveValor');

const StringUtils = require('./StringUtils');

class RequestUtils {

    // Função que verifica se uma frase contém alguma das chaves
    static containsKey(texto) {
        // Converte a frase para minúsculas para comparação case-insensitive
        const lowerCasePhrase = texto.toLowerCase();

        // Verifica se alguma das chaves está presente na frase
        for (const key of Object.keys(SubstituirChaveValor)) {
            if (lowerCasePhrase.includes(` ${key.toLowerCase()}`)) {
                return texto.replace(key, SubstituirChaveValor[key]);
            }
        }

        return texto; // Retorna o texto se nenhuma chave for encontrada
    }

    /**
    * @param {json} req - Objeto da requisição que contém os valores a serem verificados
    * @param {array} keys - Chaves dos campos que devem ser verificados
    */
    static checkRequired(req, keys) {

        const response = { code: StatusCodes.OK, message: null };

        for (const key of keys) {

            if (req[key] === null || req[key] === '' || req[key] === undefined) {

                response.code = StatusCodes.BAD_REQUEST;
                response.message = RequestUtils.containsKey(`Por favor, informe o campo ${key} válido.`);

                return response;

            }

        }

        return response;

    }

    static checkEmail(email) {

        const response = { code: StatusCodes.OK, message: null };

        if (
            !email
            || !validator.isEmail(email)
            || StringUtils.temAcento(email)
            || StringUtils.temCedilha(email)
        ) {

            response.code = StatusCodes.BAD_REQUEST;
            response.message = 'Por favor, insira um e-mail válido.';

        }

        return response;

    }

        /**
     * Verifica se os valores em req para as chaves especificadas são inteiros.
     * @param {object|array} req - Objeto da requisição ou array contendo os valores a serem verificados.
     * @param {array} keys - Chaves dos campos que devem ser verificados.
     * @returns {object} - Um objeto com o código de status e mensagem.
     */
    static checkInt(req, keys) {
        const response = { code: StatusCodes.OK, message: null };

        for (const key of keys) {
            const value = req[key];

            // Se o valor for um array, verifica cada item
            if (Array.isArray(value)) {

                if (value.length === 0) {
                    response.code = StatusCodes.BAD_REQUEST;
                    response.message = 'Por favor, forneça uma lista de números inteiros.';
                    return response;
                }

                for (let i = 0; i < value.length; i++) {
                    const intValue = parseInt(value[i]);

                    // Atualiza o item do array com o valor convertido
                    value[i] = intValue;

                    if (!Number.isInteger(intValue)) {
                        response.code = StatusCodes.BAD_REQUEST;
                        response.message = 'Por favor, forneça uma lista de números inteiros.';
                        return response;
                    }
                }

            } else {

                // Converte o valor único para inteiro e verifica
                req[key] = parseInt(value);

                if (!Number.isInteger(req[key])) {
                    response.code = StatusCodes.BAD_REQUEST;
                    response.message = RequestUtils.containsKey(`O campo ${key} precisa ser um número inteiro.`);
                    return response;
                }

            }
        }

        return response;
    }

}

module.exports = RequestUtils;
