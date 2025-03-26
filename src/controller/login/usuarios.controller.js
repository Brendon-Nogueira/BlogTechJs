const { STRING } = require('sequelize')
const usuarioService = require('../../service/usuarios.service')

const createUser = async (req, res) => {

    const {nome, email,senha} = req.body
    //const usuario = await usuarioService.getUser(nome,email, senha)
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

    const {email, senha} = req.body

    try {
        
        const usuario = await usuarioService.getUser(email, senha)
        res.render('admin/artigos')
    } catch (error) {
        
        console.error('Erro ao obter o usuário:', error)
        res.status(500).send('Erro interno no servidor')
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