const { response } = require('express');


const esAdminRole = async( req, res = response, next ) => {

    const rol = req.usuario.rol

    if(rol != 'ADMIN_ROLE'){
        res.status(401).json({
            msg: 'El usuario no es administrador'
        })
    }   

    next();
}


const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}



module.exports = {
    esAdminRole,
    tieneRole
}