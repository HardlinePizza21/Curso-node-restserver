const { Router } = require('express');
const { check } = require('express-validator');

const { validarArchivoSubir, validarCampos } = require('../middlewares');
const{ cargarArchivo, actulizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo );

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'Id de mongo invalido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
],actualizarImagenCloudinary );
// ],actulizarImagen );

router.get('/:coleccion/:id', [
    check('id', 'Id de mongo invalido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
],mostrarImagen)


module.exports = router;