const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const route = require('./routes')

app.use(morgan('dev'))

app.engine('.hbs', handlebars.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.static(path.join(__dirname, 'public')))

route(app)

app.listen(3001)
