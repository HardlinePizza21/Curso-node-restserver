const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoriaById,
    actualizarCategorias,
    borrarCategoria
} = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators')

const router = Router();


/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//Obtener una catergoria por id - publico
router.get('/:id', [
    //Crear validacion
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoriaById)

//Crear una nueva categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategorias)

//Borrar una categoria - Admin
router.delete('/:id', [
    
], borrarCategoria)

module.exports = router;