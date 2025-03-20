const slugify = require('slugify')
const db = require('../model')
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
    getAll,
    createTitulo,
    editById,
    deleteById
}
