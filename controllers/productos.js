const { Producto } = require('../models')

const obtenerProductos = async(req, res) => {
    const {limite = 5, desde = 0} = req.query

    const query = {estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number( desde ))
            .limit(Number(limite))
            .populate('usuario', 'nombre -_id')
            .populate('categoria', 'nombre -_id')
    ]);


    res.json({
        total,
        productos
    })
}

const crearProducto = async(req, res) => {
    
    const nombre = req.body.nombre.toUpperCase()

    const { categoria } = req.body
    
    const usuario = req.usuario._id

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${nombre} ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        categoria,
        usuario
    }

    const producto = await new Producto(data);

    //Guardar en DB
    await producto.save();

    res.status(201).json(producto);



}

const obtenerProductoPorId = async(req, res) => {

    const {id} = req.params

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre -_id')
        .populate('categoria', 'nombre -_id')
    res.json(producto) 

}

const actualizarProducto = async(req, res) => {
    
    const { id } = req.params 

    const { estado, usuario, categoria, ...data } = req.body 

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }else{
        delete data.nombre 
    }

    data.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

    res.json(producto)

}

// const borrarProducto = (req, res) => {

// }

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    // borrarProducto,
    // actualizarProducto,
    crearProducto
}