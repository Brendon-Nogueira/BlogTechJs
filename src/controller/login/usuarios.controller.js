const { STRING } = require('sequelize')
const usuarioService = require('../../service/usuarios.service')

const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const resultado = await usuarioService.createUser(nome, email, senha)

        if (resultado.error) {

            return res.status(400).render('registro', { error: result.error })

        } else{

            res.redirect('/login')
        }

    } catch (error) {
        console.error('Erro ao criar novo usuário:', error)
        res.status(500).render('registro', { error: "Erro interno no servidor" })
    }
}

const renderLogin = async (req, res) => {

    try {
        
        res.render('login')

    } catch (error) {
        
        console.error('Erro ao renderizar a view login :', error)
        res.status(500).send('Erro interno no servidor')
    }
}

const renderRegister = async (req, res) => {

    try {

        res.render('registro')

    } catch (error) {
        
        console.error('Erro ao renderizar a view registro :', error)
        res.status(500).send('Erro interno no servidor')
    }
}

const getUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await usuarioService.getUser(email, senha)

        if (result.error) {
            return res.render('login', { error: result.error })
        } else {

            // Armazena o token na sessão para autenticação
            req.session.token = result.token

            res.redirect('/admin')

        }

        

    } catch (error) {
        console.error('Erro ao obter o usuário:', error)
        res.status(500).render('login', { error: "Erro interno no servidor" })
    }
}


const logout = async (req, res) => {

    try {
        
        res.clearCookie('token')
        res.redirect('/')

    } catch (error) {

        console.error('Erro ao realizar o logout :', error)
        res.status(500).send('Erro interno no servidor')
    }
   
}


module.exports = {
    createUser,
    getUser,
    renderLogin,
    renderRegister,
    logout
   
}