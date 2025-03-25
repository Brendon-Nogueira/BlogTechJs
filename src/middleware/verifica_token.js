const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.cookies.token || req.headers['authorization']

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado! Token não fornecido.' })
    }

   
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1]
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido!' })
    }
}
