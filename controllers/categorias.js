const { response } = require("express");
const { Categoria } = require('../models');

//Obtener categorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query

    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number( desde ))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]);


    res.json({
        total,
        categorias
    })
}

//Obtener categoria - populate {}
const obtenerCategoriaById = async(req, res = response) => {

    const {id} = req.params

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
    
    res.json(categoria)
}


const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);

    //Guardar en DB
    await categoria.save();

    res.status(201).json(categoria);


}

//Actualizar categoria
const actualizarCategorias = async(req, res = response) => {

    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const categoria = await Categoria.findByIdAndUpdate( id, {nombre} );

    res.json(categoria);
}

//borrar categorias

const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false } );

    res.json(categoria);
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaById,
    actualizarCategorias,
    borrarCategoria
}