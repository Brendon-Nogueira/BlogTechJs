const slugify = require('slugify')
const db = require('../model'); 
const { where } = require('sequelize')

const getTitulo = async (titulo) => {
    try {
        return await db.Categoria.findOne({
            where: { titulo: titulo }
        })
    } catch (error) {
        throw error
    }
}

const createTitulo = async (titulo) => {
    try {
        // Gera o slug automaticamente com slugify
        const slug = slugify(titulo, {
            lower: true,      
            strict: true     
        })

        return await db.Categoria.create({ titulo, slug })
    } catch (error) {
        throw error
    }
}

const updateTitulo = async (id, titulo) => {
    try {
        const [updated] = await db.Categoria.update(
            { titulo, slug: slugify(titulo) }, 
            { where: { id } } 
        )

        return updated > 0
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error)
        throw error
    }
}


const deleteById = async (id) => {
    try {
        const categoria = await db.Categoria.findByPk(id)

        if (categoria) {
            await categoria.destroy()

            return { success: true, message: 'Categoria excluída com sucesso' }

        } else {

            return { success: false, message: 'Categoria não encontrada' }
        }
    } catch (error) {
        throw error
    }
}

const editById = async (id) => {
    try {
        return await db.Categoria.findByPk(id)
    } catch (error) {
        throw error
    }
}


const getAll = async () => {
    try {
        return await db.Categoria.findAll(); 
    } catch (error) {
        throw error
    }
}

module.exports = {
    getTitulo,
    updateTitulo,
    getAll,
    createTitulo,
    editById,
    deleteById
}
