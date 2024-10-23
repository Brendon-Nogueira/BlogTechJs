module.exports = (sequelize, DataTypes) => {
    const Categorias = sequelize.define('Categorias', {
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

    return Categorias;
};