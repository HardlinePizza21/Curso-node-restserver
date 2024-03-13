const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.js');

const usuariosPost = async(req, res = response) => {

    const { nombre , correo , password , rol} = req.body;
    const usuario = new Usuario({nombre , correo , password , rol});

    //Verificar si el correo existe 
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ){
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosGet = (req = request, res = response) => {

    const {q, nombre = "no name", apikey} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params;   

    res.json({
        msg: 'put API - controlador',
        id
    })
}


const usuariosDelete = (req, res = response) => { 
    res.json({
        msg: 'delete API - controlador'
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}


