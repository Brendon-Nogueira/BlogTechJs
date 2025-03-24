const { STRING } = require('sequelize')
const categoriaService = require('../../service/categorias.service')
const artigoService = require('../../service/artigos.service')

const getArtigos = async (req, res) => {

    try {
        
        const artigos = await artigoService.getArtigos()
        res.render('admin/artigos', {artigos})

    } catch (error) {

        console.error('Erro ao obter artigos:', error)
        res.status(500).send('Erro interno no servidor')
    }
}

const getAll = async (req, res) => {
    try {
        const categorias = await categoriaService.getAll();
        res.render('admin/novo_artigo', { categorias }) 
    } catch (error) {
        console.error('Erro ao obter categorias:', error)
        res.status(500).send('Erro interno no servidor')
    }
}

const createArtigo = async (req, res) => {
    const { titulo, descricao, categorias } = req.body

    try {
        
        const buscaArtigo = await artigoService.getTitulo(titulo)

        if (buscaArtigo) {
            return res.status(409).render('error')
        }

        const novoArtigo = await artigoService.createArtigo(titulo, descricao, categorias)

        res.redirect('/admin/artigos')

    } catch (error) {
        console.error('Erro ao criar artigo:', error)
        res.status(500).send('Erro interno no servidor')
    }
}

const deleteById = async (req, res) => {

    const {id} = req.body

    try {
            if  (id && Number.isInteger(Number(id))) {
    
                const resultado = await artigoService.deleteById(id)
    
                if (resultado.success) {
                    res.status(200).render('success', { message: resultado.message })
                } else {
                    res.status(404).render('error', { message: resultado.message })
                }
                
            } else {
    
                res.status(400).render('error', { message: 'ID não fornecido' })
            }
    
        } catch (error) {
    
            console.error('Erro ao excluir artigo:', error);
            res.status(500).render('error', { message: 'Erro interno no servidor' })
        }
}



module.exports = {
    getAll,
    getArtigos,
    createArtigo,
    deleteById
}