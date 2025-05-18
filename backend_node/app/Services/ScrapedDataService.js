const { ScrapedData } = require('../Models/Sequelize');

class ScrapedDataService {

    static list(limit, offset) {

        if (limit > 10) limit = 10;
        if (offset > 0) offset = (offset * limit) - limit;

        return ScrapedData.findAll({
            limit,
            offset,
            order: [['id', 'DESC']],
        });

    }
}

module.exports = ScrapedDataService;
