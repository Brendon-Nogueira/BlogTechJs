const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.cookies?.token || req.headers?.authorization

    // Se não houver token, retorna erro de acesso negado
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado! Token não fornecido.' })
    }

    // Se o token for do tipo Bearer, extrai apenas o token
    if (typeof token === 'string' && token.startsWith('Bearer ')) {
        token = token.split(' ')[1]
    }

    try {
        // Verifica se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // Armazena o usuário no objeto req para uso posterior
        next() // Passa para a próxima middleware/rota
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido!' })
    }
}
