const { STRING } = require('sequelize')
const categoriaService = require('../../service/categorias.service')

const createTitulo = async (req, res) => {  
    const { titulo } = req.body

    try {
        const buscaTitulo = await categoriaService.getTitulo(titulo)

        if (buscaTitulo) {

            //res.status(200).json({ message: 'Título já existe', data: buscaTitulo })

            res.status(409).render('error')
            return
            
        } else {

            const novaCategoria = await categoriaService.createTitulo(titulo)
            //res.status(201).json(novaCategoria)
             
            res.redirect('/')
        }
    } catch (error) {
        res.status(500).send('Erro interno no servidor')
    }
}

module.exports = {
    createTitulo  
}


