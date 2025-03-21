const { STRING } = require('sequelize')
const categoriaService = require('../../service/categorias.service')
const artigoService = require('../../service/artigos.service')

const getAll = async (req, res) => {
    try {
        const categorias = await categoriaService.getAll();
        res.render('admin/novo_artigo', { categorias }) 
    } catch (error) {
        console.error('Erro ao obter categorias:', error)
        res.status(500).send('Erro interno no servidor')
    }
}


module.exports = {
    getAll
}