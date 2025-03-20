const express = require('express')
const router = express.Router()
const controllerCategorias = require('../controller/categorias/categorias.controller')
const controllerArtigos = require('../controller/artigos/artigos.controller')


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/about', (req, res) => {
    res.render('about')
})

// Rota de listagem de categorias
router.get('/categorias', (req, res) => {
    res.send('Rota de Categorias')
})

// Rota para exibir o formulário de criação de nova categoria
router.get('/admin/categorias/new', (req, res) => {
    res.render('admin/nova_categoria')
})


router.get('/admin/categorias', controllerCategorias.getAll)

// Rota para salvar uma nova categoria - Usa POST para criar no banco
router.post('/categorias/save', controllerCategorias.createTitulo)

router.post('/categorias/delete', controllerCategorias.deleteById)

router.get('/admin/categorias/edit/:id', controllerCategorias.editById);

// Rotas de artigos
router.get('/artigos', (req, res) => {
    res.send('Rota de Artigos')
})
router.get('/admin/artigos/new', (req, res) => {
    res.send('Rota Admin / Artigos')
})

module.exports = router
