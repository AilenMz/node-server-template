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

  //verificar si el correo existe
  const findCorreo = await Usuario.findOne({ correo: correo });
  if (findCorreo) {
    return res.status(400).json({
      error: "El correo ya está registrado",
    });
  }

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

const usuariosPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "put API - usuariosPut",
    id,
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
