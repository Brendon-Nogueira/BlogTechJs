const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../model').Usuario
require('dotenv').config()

const getUser = async (email, senha) => {
    try {
        const usuario = await Usuario.findOne({ where: { email } })
        if (!usuario) return { error: "Usuário não encontrado" }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) return { error: "Senha incorreta" }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        )

        return { message: "Login bem-sucedido!", token }
    } catch (error) {
        return { error: "Erro ao fazer login" }
    }
}

module.exports = {
    getUser
}
