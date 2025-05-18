const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const Ambiente = require('../../Enums/Ambiente');
const Log = require('../../Utils/Log');

const basename = path.basename(__filename);
const db = {};

const {
    MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, NODE_ENV,
} = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    timezone: '-03:00',
    logging: NODE_ENV === Ambiente.PROD ? false : Log.info,
});

Log.info('Mysql Connectado!');

// Override association methods to set default onDelete and onUpdate
const originalBelongsTo = Sequelize.Model.belongsTo;
Sequelize.Model.belongsTo = function (targetModel, options = {}) {
    options.onDelete = options.onDelete || 'RESTRICT';
    options.onUpdate = options.onUpdate || 'CASCADE';
    return originalBelongsTo.call(this, targetModel, options);
};

const originalHasMany = Sequelize.Model.hasMany;
Sequelize.Model.hasMany = function (targetModel, options = {}) {
    options.onDelete = options.onDelete || 'RESTRICT';
    options.onUpdate = options.onUpdate || 'CASCADE';
    return originalHasMany.call(this, targetModel, options);
};

const originalHasOne = Sequelize.Model.hasOne;
Sequelize.Model.hasOne = function (targetModel, options = {}) {
    options.onDelete = options.onDelete || 'RESTRICT';
    options.onUpdate = options.onUpdate || 'CASCADE';
    return originalHasOne.call(this, targetModel, options);
};

const originalBelongsToMany = Sequelize.Model.belongsToMany;
Sequelize.Model.belongsToMany = function (targetModel, options = {}) {
    options.onDelete = options.onDelete || 'RESTRICT';
    options.onUpdate = options.onUpdate || 'CASCADE';
    return originalBelongsToMany.call(this, targetModel, options);
};

fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {

        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);// eslint-disable-line
        const modelName = file.replace('.js', '');
        db[modelName] = model;

    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

if (process.env.NODE_ENV === Ambiente.DEV) {
    // Sincroniza os modelos com o banco de dados
    sequelize.sync().then(() => {
        Log.info('Banco de dados sincronizado com os modelos');
    }).catch((error) => Log.error('Erro em sequelize.sync: ', error));
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;