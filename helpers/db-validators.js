const Role = require('../models/roles');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = Role.findOne({rol: rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const existeCorreo = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ){
        throw new Error(`El correo ${correo} ya está registrado en la base de datos`)
    }
}

module.exports = {
    esRoleValido,
    existeCorreo
}