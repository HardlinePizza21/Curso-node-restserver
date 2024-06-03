const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.js');

const usuariosPost = async(req, res = response) => {

    const { nombre , correo , password , rol} = req.body;
    const usuario = new Usuario({nombre , correo , password , rol});

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



const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true }; 

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);



    res.json({
        total, 
        usuarios    
    })
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;   
    const {_id, password, google, ...resto} = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    
    res.json(usuario)
}


const usuariosDelete = async(req, res = response) => { 

    const {id} = req.params;


    //Borrar fisicamente 
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})


    res.json({
        id,
        usuario
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


