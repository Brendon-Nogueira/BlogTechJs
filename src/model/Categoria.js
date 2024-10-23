module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categorias', {
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
        }
    });

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Artigo, {
            foreignKey: 'categoriaId',
            as: 'artigos'
        });
    };

    return Categoria;
};
