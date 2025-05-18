const { Op } = require('sequelize');
const { Process } = require('../Models/Sequelize');

class ProcessService {

    static findById(id) {
        return Process.findOne({
            where: { id },
        });
    }

    static list(keyword = null, date_initial = null, date_final = null) {
        
        const whereClause = {};

        if (date_initial) {
            whereClause.data_disponibilizacao = {  [Op.gte]: date_initial};
        } 
        
        if (date_final) {
            if (whereClause.data_disponibilizacao) {
                // Faz between se já existe a data inicial
                whereClause.data_disponibilizacao = {
                    [Op.and]: [
                        { [Op.gte]: date_initial },
                        { [Op.lte]: date_final }
                    ]
                };
            } else {
                // Se não existe a data inicial, só adiciona a data final
                whereClause.data_disponibilizacao = { [Op.lte]: date_final };
            }
        }

        if (keyword) {
            whereClause[Op.or] = [
                { numero_processo: { [Op.like]: `%${keyword}%` } },
                { data_disponibilizacao: { [Op.like]: `%${keyword}%` } },
                { autores: { [Op.like]: `%${keyword}%` } },
                { advogados: { [Op.like]: `%${keyword}%` } },
                { conteudo_publicacao: { [Op.like]: `%${keyword}%` } },
                { valor_bruto: { [Op.like]: `%${keyword}%` } },
                { valor_liquido: { [Op.like]: `%${keyword}%` } },
                { juros_moratorios: { [Op.like]: `%${keyword}%` } },
                { honorarios_advocaticios: { [Op.like]: `%${keyword}%` } },
                { reu: { [Op.like]: `%${keyword}%` } },
                { status: { [Op.like]: `%${keyword}%` } },
                { link: { [Op.like]: `%${keyword}%` } },
            ];
        }
        return Process.findAll({
            where: whereClause,
            order: [['id', 'DESC']],
        });

    }

    static updateStatus(id, status) {

        return Process.update({ status }, {
            where: { id },
        });

    }

}

module.exports = ProcessService;
