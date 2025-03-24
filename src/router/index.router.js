const express = require('express')
const router = express.Router()
const db = require('../model')
const controllerCategorias = require('../controller/categorias/categorias.controller')
const controllerArtigos = require('../controller/artigos/artigos.controller')


const Artigo = db.Artigo 

router.get('/', (req, res) => {
    Artigo.findAll({
        // join
        include: [{ model: db.Categoria, as: 'categoria' }] 
    }).then(artigos => {
        res.render('index', { artigos })
    }).catch(err => {
        console.error('Erro ao buscar artigos:', err)
        res.status(500).send('Erro interno ao buscar artigos')
    })
})


router.get('/', controllerArtigos.getArtigos)

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
router.post('/artigos/delete', controllerArtigos.deleteById)
router.get('/admin/artigos/edit/:id', controllerArtigos.editById);





module.exports = router


