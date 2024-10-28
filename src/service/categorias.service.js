const slugify = require('slugify')
const db = require('../model')

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

module.exports = {
    getTitulo,
    createTitulo
}
