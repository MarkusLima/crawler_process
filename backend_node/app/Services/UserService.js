const { User } = require('../Models/Sequelize');

class UserService {

    static get(email) {
        return User.findOne({ where: { email } });
    }

    static getById(id) {
        return User.findOne({ where: { id } });
    }

    static create(data) {
        return User.create(data);
    }

    static update(data, id) {
        return User.update(data, { where: { id } });
    }

}

module.exports = UserService;
