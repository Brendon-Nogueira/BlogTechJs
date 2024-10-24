const { STRING } = require('sequelize')
const categoriaService = require('../../service/categorias.service')

const getTitulo = async (req, res) => {
    
    const { titulo } = req.body

    try {

        const buscaTitulo = await categoriaService.getTitulo(titulo)

        if(buscaTitulo){
            res.status(200).json(buscaTitulo)
        }else {
            res.status(404).send('Não encontrado')
        }
    } catch (error) {
        res.status(500).send('Erro interno no servidor')
    }

}



module.exports = {
    getTitulo
}