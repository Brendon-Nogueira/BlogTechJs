const express = require('express')
const router = express.Router()
const db = require('../model')
const verificarToken = require('../middleware/verifica_token')
const controllerCategorias = require('../controller/categorias/categorias.controller')
const controllerArtigos = require('../controller/artigos/artigos.controller')
const controllerUsuarios = require('../controller/login/usuarios.controller')
const Artigo = db.Artigo 

// rotas publicas homepage e about
router.get('/', (req, res) => {
    Artigo.findAll({
        include: [
            { model: db.Categoria, as: 'categoria' },
            { model: db.Usuario, as: 'usuario', attibutes: ['nome'] } 
        ]
    }).then(artigos => {
        res.render('index', { 
            artigos,
            usuario: req.session.usuario || null 
        })
    }).catch(err => {
        console.error('Erro ao buscar artigos:', err)
        res.status(500).send('Erro interno ao buscar artigos')
    })
})


router.get('/about', (req, res) => {
    res.render('about')
})


// Rotas de categorias
router.get('/admin/categorias', verificarToken ,controllerCategorias.getAll)
router.get('/admin/categorias/new', verificarToken,controllerCategorias.renderCategorias)
router.post('/categorias/save',controllerCategorias.createTitulo)
router.post('/categorias/update',controllerCategorias.updateTitulo)
router.post('/categorias/delete', controllerCategorias.deleteById)
router.post('/categorias/delete/:id',verificarToken, controllerCategorias.deleteById)
router.get('/admin/categorias/edit/:id', verificarToken,controllerCategorias.editById)
router.post('/admin/categorias/edit/:id',controllerCategorias.editById)



// Rotas de artigos
router.get('/admin/artigos', verificarToken,controllerArtigos.getArtigos)
router.get('/admin/artigos/new', verificarToken,controllerArtigos.getAll)
router.post('/artigos/save', controllerArtigos.createArtigo)
router.post('/artigos/delete', controllerArtigos.deleteById)
router.post('/artigos/update', controllerArtigos.updateArtigo)
router.get('/admin/artigos/edit/:id', verificarToken,controllerArtigos.editById)


// rotas de login
router.get('/login', controllerUsuarios.renderLogin)
router.post('/login', controllerUsuarios.getUser)
router.get('/registrar', controllerUsuarios.renderRegister)
router.post('/registrar/novo_usuario', controllerUsuarios.createUser)
router.post('/logout', controllerUsuarios.logout )



// rota protegida para visualizar os usuários
router.get('/admin/usuarios', verificarToken, async (req, res) => {
    try {
        const usuarios = await db.Usuario.findAll() 
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários" })
    }
})


module.exports = router

