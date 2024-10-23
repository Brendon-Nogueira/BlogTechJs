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
        fk_id_categoria: {  
            type: DataTypes.INTEGER,
            allowNull: false,  
            references: {
                model: 'Categoria',  
                key: 'id'
            }
        }
    });

    Artigo.associate = (models) => {
        Artigo.belongsTo(models.Categoria, {  
            foreignKey: 'fk_id_categoria', 
            as: 'categoria'  
        });
    };

    return Artigo;
};
