const slugify = require('slugify')
const db = require('../model')
const { where } = require('sequelize')

const getArtigos = async () => {
    try {
        return await db.Artigo.findAll({

            // inner join

            include: [{
                model: db.Categoria,  
                as: 'categoria'       
            }]
        })
    } catch (error) {
        throw error
    }
}

const getTitulo = async (titulo) => {
    try {
            return await db.Artigo.findOne({
                where: { titulo: titulo }
            })
        } catch (error) {
            throw error
        }
}

const createArtigo = async (titulo, descricao, categoria) => {
    try {
       
        const slug = slugify(titulo, {
            lower: true,      
            strict: true     
        })

        return await db.Artigo.create({ 
            titulo: titulo, 
            slug: slug, 
            conteudo: descricao, 
            fk_id_categoria: categoria
        })

    } catch (error) {
        throw error
    }
}

const deleteById = async (id) => {
    try {
        const artigo = await db.Artigo.findByPk(id)

        if (artigo) {
            await artigo.destroy()

            return { success: true, message: 'Artigo excluído com sucesso' }

        } else {

            return { success: false, message: 'Artigo não encontrado' }
        }
    } catch (error) {
        throw error
    }
}

const editById = async (id) => {
    try {
        return await db.Artigo.findByPk(id, {
            include: {
                model: db.Categoria, 
                as: 'categoria' 
            }
        });
    } catch (error) {
        throw error;
    }
}

const updateArtigo = async (id, titulo, descricao, id_categoria) => {
    try {
        const artigo = await db.Artigo.findByPk(id)

        if (!artigo) {
            return null
        }

        const [updated] = await db.Artigo.update(
            { 
                titulo: titulo, 
                slug: slugify(titulo), 
                conteudo: descricao, 
                fk_id_categoria: id_categoria 
            }, 
            { where: { id } }
        )
        
        return updated > 0 ? await db.Artigo.findByPk(id) : null

        
    } catch (error) {
        console.error("Erro ao atualizar artigo:", error)
        throw error
    }
}


module.exports = {
    getArtigos,
    getTitulo,
    createArtigo,
    updateArtigo,
    deleteById,
    editById
}