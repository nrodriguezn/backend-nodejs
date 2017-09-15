'use strinct'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')


mongoose.connection.openUri(config.db, (err, res) => {
  if (err){
      console.log(`Error al conectar en la base de datos: ${err}`)
  }
    console.log("conexion a la base de datos establecida")

  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})
