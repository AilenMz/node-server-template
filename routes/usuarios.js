const { Router } = require('express');
const { check } = require('express-validator');


const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const { esRolValido, existeEmail } = require('../helpers/db-valdiators');
const {validarCampos} = require('../middleweres/validar-campos')

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que tener más de 6 caracteres').isLength({min:6}),
    check('correo', 'no es un email válido').isEmail(),
    //check('rol', 'El rol no es válido').isIn(['ADMIN', 'USER']),
    check('correo').custom(existeEmail),
    check('rol').custom( (rol) => esRolValido(rol) ),
    validarCampos
],usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;