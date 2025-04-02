const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    if (!req.session.user || !req.session.user.token) {
        return res.redirect('/login')
    }

    try {
        const decoded = jwt.verify(req.session.user.token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário à requisição
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error)
        req.session.destroy(); // Remove a sessão inválida
        return res.redirect('/login')
    }
}

module.exports = authMiddleware
