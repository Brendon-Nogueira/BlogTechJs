const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {

    res.send('Bem Vindo a minha aplicação')
})

module.exports = router