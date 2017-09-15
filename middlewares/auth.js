'use strict'

const services = require('../services')


function isAuth( req, res, next){ //como es un middleware, para que pase la ejecucion de la ruta, le pasa la funcion al controlador final
  if (!req.headers.authorization){
    return res.status(403).send({message: 'No tienes autorizacion'})
  }

  const token = req.headers.authorization.split(" ")[1]//como hay un espacio separa la cabecera en 2 nada mas

  services.decodeToken(token)
  .then(response => {
    req.user = response
    next()
  })
  .catch(response => {
    res.status(response.status)
  })
}

module.exports = isAuth
