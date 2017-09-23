'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('.hbs', hbs({
  defaultlayaut: 'default',
  extname: '.hbs'
}))//para configurar el motor de plantillas
app.set('view engine', '.hbs')
app.use('/api', api)
app.get('/login', (req, res) =>{
  res.render('login')
})
app.get('/producta',  (req, res) =>{
  res.render('product')
})

module.exports = app
