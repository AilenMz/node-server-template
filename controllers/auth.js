const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/usuario')
const {generarJWT} = require('../helpers/generarJWT');
const googleVerify = require("../helpers/google-verify");


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
        const token = await generarJWT(user.id)

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Hable con el administardor'
        })
    }
}

const googleSignIn = async(req, res=response) => {
    const {id_token} = req.body

    try {

        const {nombre, img, correo} = await googleVerify(id_token)

        // verificar si el correo existe en la base de datos
        let usuario = await Usuario.findOne({ correo });


        if(!usuario){
            //si no existe tengo que crearlo
            const data = {
                nombre,
                correo, 
                password: ':P - ñ',
                img, 
                google: true,
                rol: 'USER'
            }
            usuario = new Usuario(data)
            await usuario.save()
        }

        if(usuario.estado === false){
            res.status(401).json({
                msg: 'usuario bloqueado. Hable con Admin'
            })
        }

        
        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'google sign in ok',
            token
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: 'el token de google no se pudo verificar'
        })
    }

   
}

module.exports = {
    login,
    googleSignIn
}