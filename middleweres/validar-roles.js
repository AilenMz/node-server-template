const { response } = require("express")

//forzar a que sea solo admin 
const validarRol = (req, res = response, next) => {

    // el req.usuario se crea en el middlewere de validar JWT

    if(!req.usuario){
        return res.status(500).json({
            msg: "se quiere validar rol sin validar el token primero"
        })
    }

    const {rol, nombre} = req.usuario

    if (rol !== 'ADMIN'){ // podria ser tambien || !=='VENTAS'
        return res.status(401).json({
            msg: `${nombre} no tiene rol de administrador`
        })
    }

    next()
}


const tieneRoles = (...rolesEnArgs) =>{

    return (req, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: "se quiere validar rol sin validar el token primero"
            })
        }

        if(!rolesEnArgs.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: 'rol no autorizado'
            })
        }

        next()
    }

}

module.exports = {
    validarRol,
    tieneRoles}