const db = require('../model')



const getTitulo = async (titulo) => {

    try {
        const titulo = await db.Question.findOne({
            where: { titulo: titulo }
        })
        return titulo 
    } catch (error) {
        throw error
    }
}


module.exports = {
    getTitulo
}