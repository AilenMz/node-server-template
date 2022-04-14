const Role = require("../models/role.js");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`el rol ${rol} no está registrado en la base de datos`);
  }
};

const existeEmail = async (correo = "") => {
  const findCorreo = await Usuario.findOne({ correo: correo });
  if (findCorreo) {
    throw new Error(`el correo ${correo} ya se encuentra registrado`);
  }
};

module.exports = {
  esRolValido,
  existeEmail,
};
