module.exports = (sequelize, DataTypes) => {
    const Artigo = sequelize.define('Artigo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        categoriaId: { 
            type: DataTypes.INTEGER,
            references: {
                model: 'Categorias',
                key: 'id'
            }
        }
    });

    Artigo.associate = (models) => {
        Artigo.belongsTo(models.Categorias, {
            foreignKey: 'categoriaId',
            as: 'categoria'
        });
    };

    return Artigo;
};
