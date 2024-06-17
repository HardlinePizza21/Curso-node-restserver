const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const {
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto,
    crearProducto
} = require('../controllers/productos')

const { existeProducto, existeCategoria } = require('../helpers/db-validators')

const router = Router();


/**
 * {{url}}/api/productos
 */

//Obtener todas los prodcutos - publico
router.get('/', obtenerProductos)

// Crear un nuevo produto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],crearProducto)

//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProductoPorId)


// Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto)

//Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'Mongo id invalido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto)

module.exports = router;