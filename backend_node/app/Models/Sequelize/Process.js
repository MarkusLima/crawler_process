module.exports = (sequelize, DataTypes) => {

    const Process = sequelize.define(
        'processes',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            numero_processo: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            data_disponibilizacao: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            autores: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            advogados: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            conteudo_publicacao: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            valor_bruto: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            valor_liquido: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            juros_moratorios: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            honorarios_advocaticios: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            reu: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            link: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
        },
    );

    Process.associate = (models) => {
        Process.hasMany(models.UserProcess, { foreignKey: 'process_id', as: 'user_processes' });
    };

    return Process;

};
