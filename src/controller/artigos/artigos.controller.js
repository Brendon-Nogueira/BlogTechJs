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

const editById = async (req, res) => {
    const { id } = req.params;

    try {
        if (id && Number.isInteger(Number(id))) {
            const artigo = await artigoService.editById(id);
            const categorias = await categoriaService.getAll();

            if (artigo) {
                const artigoFormatado = {
                    ...artigo.dataValues,
                    categoria: artigo.categoria ? artigo.categoria : { id: null } 
                }

                res.status(200).render('admin/editar_artigo', { artigo: artigoFormatado, categorias })
            } else {
                res.status(404).render('error', { message: 'Artigo não encontrado' })
            }
        } else {
            res.status(400).render('error', { message: 'ID inválido' })
        }
    } catch (error) {
        console.error('Erro ao buscar artigo:', error);
        res.status(500).render('error', { message: 'Erro interno no servidor' })
    }
}

const updateArtigo = async (req, res) => {
    const { id, titulo, descricao, id_categoria } = req.body

    if (!id || !titulo || !descricao || !id_categoria) {
        return res.status(400).render('error', { message: 'Todos os campos são obrigatórios' })
    }

    try {
        const artigoAtualizado = await artigoService.updateArtigo(id, titulo, descricao, id_categoria)

        if (!artigoAtualizado) {
            return res.status(404).render('error', { message: 'Artigo não encontrado' })
        }

        res.redirect('/admin/artigos') 

    } catch (error) {
        res.status(400).render('error', { message: error.message })
    }
}





module.exports = {
    getAll,
    getArtigos,
    createArtigo,
    updateArtigo,
    deleteById,
    editById
}