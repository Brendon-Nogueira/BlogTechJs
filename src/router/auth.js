const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../model').Usuario
const router = express.Router() 
require('dotenv').config() 


router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body

        const usuario = await Usuario.findOne({ where: { email } })
        if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" })

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" })

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        )

        // Envia o token via cookie
        res.cookie('token', token, { httpOnly: true })

        res.json({ message: "Login bem-sucedido!", token })
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login" })
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({ message: "Logout realizado com sucesso!" })
})

module.exports = router
