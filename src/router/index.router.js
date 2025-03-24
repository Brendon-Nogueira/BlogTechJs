const express = require('express')
const router = express.Router()
const controllerCategorias = require('../controller/categorias/categorias.controller')
const controllerArtigos = require('../controller/artigos/artigos.controller')


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/about', (req, res) => {
    res.render('about')
})

// Rota para exibir o formulário de criação de nova categoria
router.get('/admin/categorias/new', (req, res) => {
    res.render('admin/nova_categoria')
})

router.get('/admin/categorias', controllerCategorias.getAll)

// Rota para salvar uma nova categoria - Usa POST para criar no banco
router.post('/categorias/save', controllerCategorias.createTitulo)

router.post('/categorias/update', controllerCategorias.updateTitulo)

router.post('/categorias/delete', controllerCategorias.deleteById)

router.get('/admin/categorias/edit/:id', controllerCategorias.editById);



// Rotas de artigos
router.get('/admin/artigos', controllerArtigos.getArtigos)
router.get('/admin/artigos/new', controllerArtigos.getAll)
router.post('/artigos/save', controllerArtigos.createArtigo)
router.post('artigos/delete', controllerArtigos.deleteById)





module.exports = router


