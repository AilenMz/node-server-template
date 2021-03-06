const { response , request} = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {

      const token = req.header('x-token')

      if (!token) {
          res.status(401).json({
              msg: 'No autorizado'
          })
      }

      try {
       const {uid} =  jwt.verify(token, process.env.SECTRET)

       // leer el usuario que corresponde con el uid

       let usuario = await Usuario.findById(uid)

       if(!usuario){
        res.status(401).json({
          msg: "Usuario inexistente"
        })
       }

       // verificar que el usuario no haya sido borrado

       if (!usuario.estado) {
         res.status(401).json({
           msg: "Token no válido - user false"
         })
       }

       req.usuario = usuario

        next()
          
      } catch (error) {
          console.log(error)
          res.status(401).json({
            msg: 'Token no válido'
        })
      }


}

module.exports = validarJWT