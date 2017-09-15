'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
  const payload = {
    sub: user._id, //id del usuario (no el de mongoose)
    iat: moment().unix(),  //determinadas fechas para indicar cuando fue creado el token y cuando expira  //tiempo en formato unix
    exp: moment().add(14, 'days').unix(),
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){  //la promesa se recibe en auth de middlewares
    const decoded = new Promise((resolve, reject) => {//promesa resuelta, se resolvio la funcion y reject que se invoca cuando ocurre un error
      try{
        const payload = jwt.decode(token, config.SECRET_TOKEN)
        if (payload.exp <= moment().unix()){//verificando si ya caduco
          reject({  //para que entre en el catch de la promesa
            status: 401,
            message: 'el token ha expirado'
          })
        }
        resolve(payload.sub)  //si el token es correcto
      }catch(err){
        reject({
          status: 500,
          message: 'Invalid Token'
        })
      }
    })
    return decoded  //devuelve la promesa
}


module.exports = {
  createToken,
  decodeToken
}
