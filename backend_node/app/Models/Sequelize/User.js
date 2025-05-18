module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            hashed_password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
        },
    );

    User.associate = (models) => {
        User.hasMany(models.UserProcess, { foreignKey: 'user_id', as: 'user_processes' });
    };

    return User;

};
