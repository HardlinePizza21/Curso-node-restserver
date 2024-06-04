const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {password, __v, _id,  ...user} = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = model('Usuario', UsuarioSchema)