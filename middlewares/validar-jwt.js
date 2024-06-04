const jwt = require('jsonwebtoken');
const { response, request } = require('express');    

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuarioAutenticado = await Usuario.findById(uid);

        // Verificar si el usuario existe

        if(!usuarioAutenticado){
            res.status(401).json({
                msg: 'Usuario no existe en la DB'
            })
        }
        if(!usuarioAutenticado.estado){
            res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }


        req.usuarioAutenticado = usuarioAutenticado;

        next()
    }catch(error){
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }





    next();

}


module.exports = {
    validarJWT
}


