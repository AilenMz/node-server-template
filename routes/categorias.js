const { Router } = require('express');
const { check } = require('express-validator');

const {login, googleSignIn} = require('../controllers/auth');
const { validarCampos } = require('../middleweres/validar-campos');

const router = Router();

// obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get')
})

// obtener una potegaria - publico
router.get('/:id', (req, res) => {
    let {id} = req.params
    res.json(`id ${id}`)
})

// crear categoria - privado con cualquier rol
router.post('/', (req, res) => {
    res.json('post')
})

// actualizar categoria - privado con cualquier con token valido
router.put('/:id', (req, res) => {
    res.json('put')
})

// borrar categoria - privado solo admin
router.delete('/:id', (req, res) => {
    res.json('delete')
})

module.exports= router