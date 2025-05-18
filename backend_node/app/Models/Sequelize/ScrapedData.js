module.exports = (sequelize, DataTypes) => {

    const ScrapedData = sequelize.define('scraped_data', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(18),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        updatedAt: false,
        createdAt: false,
        freezeTableName: true,
    });

    return ScrapedData;

};
