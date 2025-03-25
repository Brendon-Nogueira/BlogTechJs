const { STRING } = require('sequelize')
const usuarioService = require('../../service/usuarios.service')

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


module.exports = {
    getUser
   
}