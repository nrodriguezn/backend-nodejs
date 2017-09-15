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

module.exports = createToken
