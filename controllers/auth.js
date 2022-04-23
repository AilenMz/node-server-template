const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/usuario')


const login = async (req = request, res = response) => {

    const {correo, password} = req.body

    try {
        // verificar si el mail existe
            const user = await Usuario.findOne({correo})
            if(!user) {
                return res.status(400).json({
                    msg: "usuario / password no son correctos - correo"
                })
            }

        // si el usuario está activo

        if(!user.estado) {
            return res.status(400).json({
                msg: "usuario / password no son correctos - estado : false"
            })
        }
        // verificar contraseña

            const validPassword = bcryptjs.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({
                    msg: "usuario / password no son correctos - password"
                })
            }

        // generar JWT
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Hable con el administardor'
        })
    }
}

module.exports = {login}