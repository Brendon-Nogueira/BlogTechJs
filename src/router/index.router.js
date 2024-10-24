const express = require('express')
const router = express.Router()
const controllerCategorias = require('../controller/categorias/categorias.controller')
const controllerArtigos = require('../controller/artigos/artigos.controller')


router.get('/', (req, res) => {

    res.render('index')
})


router.get('/categorias',  (req, res) =>{
    res.send('Rota de Categorias')
})
router.get('/admin/categorias/new',  (req, res) =>{
    res.render('admin/nova_categoria')
})

router.get('/admin/categorias/save', controllerCategorias.getTitulo)


router.get('/artigos',  (req, res) =>{
    res.send('Rota de Artigos')
})
router.get('/admin/artigos/new',  (req, res) =>{
    res.send('Rota  Admin / Artigos')
})


module.exports = router