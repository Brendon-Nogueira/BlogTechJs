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
             
            res.redirect('/admin/categorias')
        }
    } catch (error) {
        res.status(500).send('Erro interno no servidor')
    }
}

const deleteById = async (req, res) => {
    const { id } = req.body;

    try {
        if  (id && Number.isInteger(Number(id))) {

            const resultado = await categoriaService.deleteById(id)

            if (resultado.success) {
                res.status(200).render('success', { message: resultado.message })
            } else {
                res.status(404).render('error', { message: resultado.message })
            }
            
        } else {

            res.status(400).render('error', { message: 'ID não fornecido' })
        }

    } catch (error) {

        console.error('Erro ao excluir categoria:', error);
        res.status(500).render('error', { message: 'Erro interno no servidor' })
    }
}

const editById = async (req, res) => {

    const { id } = req.params

    try {
        if (id && Number.isInteger(Number(id))) {
            const categoria = await categoriaService.editById(id)

            if (categoria) {
                res.status(200).render('admin/edit', { categoria })
            } else {
                res.status(404).render('error', { message: 'Categoria não encontrada' })
            }
        } else {
            res.status(400).render('error', { message: 'ID inválido' })
        }
    } catch (error) {
        console.error('Erro ao buscar categoria:', error)
        res.status(500).render('error', { message: 'Erro interno no servidor' })
    }
}

const updateTitulo = async (req, res) => {
    const { id, titulo } = req.body; 

    try {
        if (id && Number.isInteger(Number(id)) && titulo.trim() !== '') {
            const categoriaAtualizada = await categoriaService.updateTitulo(id, titulo)

            if (categoriaAtualizada) {
                
                const categorias = await categoriaService.getAll()
                
                res.status(200).render('admin/categorias', { categorias })
            } else {
                res.status(404).render('error', { message: 'Categoria não encontrada ou não atualizada' })
            }
        } else {
            res.status(400).render('error', { message: 'ID inválido ou título vazio' })
        }
    } catch (error) {
        console.error('Erro ao atualizar a categoria:', error);
        res.status(500).render('error', { message: 'Erro interno no servidor' })
    }
}


const getAll = async (req, res) => {
    try {
        const categorias = await categoriaService.getAll();
        res.render('admin/categorias', { categorias }) 
    } catch (error) {
        console.error('Erro ao obter categorias:', error)
        res.status(500).send('Erro interno no servidor')
    }
}

module.exports = {
    createTitulo,
    updateTitulo,
    editById,
    deleteById,
    getAll 
}


