const { VerificaUsuario } = require('../Models/Sequelize');


class VerificaUsuarioService {

    static async create(email) {

        // Código fixo para ambiente de teste
        // let codigo = 1000;

        // const [verificaUsuario, created] = await VerificaUsuario.findOrCreate({
        //     where: { email },
        //     defaults: { codigo },
        // });

        // if (!created) await verificaUsuario.increment('tentativas');

        // return verificaUsuario;

    }

}

module.exports = VerificaUsuarioService;
