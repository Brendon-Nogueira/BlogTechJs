const express = require('express')
const app = express()
const path = require('path')
const db = require('./model') 
const router = require('./router/index.router')


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/public', express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/', router)

// Autentica a conexão com o banco de dados
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.')

    
    return db.sequelize.sync({ alter: true })
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.')

    app.listen(8088, () => console.log('Server is running on port 8088'))
  })
  .catch(err => {
    console.error('Erro ao conectar no banco de dados ou sincronizar tabelas:', err)
  })
