require('dotenv').config();

const express = require('express')
const session = require('express-session')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./model') 
const router = require('./router/index.router')


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/public', express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  
}))


// Middleware para tornar a sessão disponível nas views
app.use((req, res, next) => {
  res.locals.session = req.session
  next();
})

app.use('/', router)



// Autentica a conexão com o banco de dados
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.')
    console.log("JWT Secret:", process.env.JWT_SECRET)

    
    return db.sequelize.sync({}) //  alter: true
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.')

    app.listen(8088, () => console.log('Servidor express na porta 8088'))
  })
  .catch(err => {
    console.error('Erro ao conectar no banco de dados ou sincronizar tabelas:', err)
  })
