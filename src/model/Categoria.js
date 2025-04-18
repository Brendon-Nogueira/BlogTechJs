const slugify = require('slugify')

module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {  
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
    }, {
        tableName: 'categorias'  
    })

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Artigo, {
            foreignKey: 'fk_id_categoria',  
            as: 'artigos'  
        })
    }

    Categoria.beforeCreate((categoria) => {
        categoria.slug = slugify(categoria.titulo, {
            lower: true,
            strict: true
        })
    })

    return Categoria
}
