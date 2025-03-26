const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
    
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'usuarios',
        hooks: {
            beforeCreate: async (usuario) => {
                const salt = await bcrypt.genSalt(10)
                usuario.senha = await bcrypt.hash(usuario.senha, salt)
            }
        }
    })

    return Usuario
}
