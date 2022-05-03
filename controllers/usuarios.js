const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {

  const {limite = 5, desde = 0} = req.query


  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({estado: true}),
    Usuario.find({estado: true})
    .skip(desde)
    .limit(limite)
  ])

  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const user = new Usuario({ nombre, correo, password, rol });

  //encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //guardar en db

  await user.save();

  res.json({
    msg: "post API - usuariosPost",
    user,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const {_id, google, correo, password, ...info} = req.body

  // TODO validar contra base de datos

  if (password){
    const salt = bcrypt.genSaltSync();
    info.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, info)

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {

  const {id} = req.params

  //fisicamente lo borramos

  // const userD = await Usuario.findByIdAndDelete({_id: id})

  //cambiar estado de usurario
  const userD = await Usuario.findByIdAndUpdate(id, {estado:false})
  const usuarioAutenticado = req.usuario

  res.json({userD, usuarioAutenticado});
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
