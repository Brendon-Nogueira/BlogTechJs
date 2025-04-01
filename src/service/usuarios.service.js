const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../model').Usuario
require('dotenv').config()

const getUser = async (email, senha) => {
    try {


        const usuario = await Usuario.findOne({ where: { email: email.trim().toLowerCase() } })

        console.log("Nome de usuário: ", usuario.nome)
        console.log("Senha digitada no login:", senha);
        
        console.log("Senha armazenada no banco ao buscar:", usuario.senha);


        if (!usuario) return { error: "Usuário não encontrado" }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        
        

        console.log("Senha digitada no login:", senha)
        console.log("Senha armazenada no banco:", usuario.senha)
        console.log("Resultado da comparação:", senhaValida)


        if (!senhaValida) return { error: "Senha incorreta" }


        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return { usuario, token }

    } catch (error) {
        console.error('Erro ao fazer login:', error)
        return { error: "Erro ao fazer login" }
    }
}


const createUser = async (nome, email, senha) => {
    try {
        const usuarioExistente = await Usuario.findOne({ where: { email } })
        if (usuarioExistente) {
            return { error: "Usuário já cadastrado" }
        }

        // Criação do usuário sem hashear manualmente a senha
        const novoUsuario = await Usuario.create({ 
            nome, 
            email: email.trim().toLowerCase(), 
            senha // A senha será automaticamente hasheada pelo hook do Sequelize
        })

        // Geração do token JWT
        const token = jwt.sign(
            { id: novoUsuario.id, email: novoUsuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { usuario: novoUsuario, token }
    } catch (error) {
        console.error("Erro ao criar usuário:", error)
        return { error: "Erro interno no servidor" }
    }
};


module.exports = {
    createUser,
    getUser
}
