const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
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
  const {google, password, ...info} = req.body

  // TODO validar contra base de datos

  if (password){
    const salt = bcrypt.genSaltSync();
    info.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, info)

  res.json({
    msg: "put API - usuariosPut",
    usuario
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usuariosDelete",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
