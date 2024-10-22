const express = require('express')
const app = express()
const path = require('path')
const router = require('./router/index.router')



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())




app.use('/', router)

app.listen(8088, () => console.log('Server is running on port 8088'))
