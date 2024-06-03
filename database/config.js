const moongose = require('mongoose');

const dbConnetion = async() => {

    try{
        moongose.connect(process.env.MONGOBD_CNN);
        console.log('Conectado a la base de datos')
    }catch(error){
        console.log(error)
        throw new Error('Error de conexion con la base de datos');
    }

}

module.exports = {
    dbConnetion
}