module.exports = (sequelize, DataTypes) => {

    const UserProcess = sequelize.define(
        'user_processes',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            process_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            previous_data: {
                type: DataTypes.TEXT('medium'),
                allowNull: false,
            },
            updated_data: {
                type: DataTypes.TEXT('medium'),
                allowNull: false,
            },
        },
        {
            updatedAt: true,
            createdAt: false,
            freezeTableName: true,
        },
    );

    UserProcess.associate = (models) => {
        UserProcess.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
        UserProcess.belongsTo(models.Process, { foreignKey: 'process_id', as: 'processes' });
    };

    return UserProcess;

};
