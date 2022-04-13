const { validationResult } = require("express-validator");
const { response, request } = require("express");


const validarCampos = (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    //si no entrea al if, que pase al siguiente 
    next()
}



module.exports={
    validarCampos
}