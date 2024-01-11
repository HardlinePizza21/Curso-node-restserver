const express = require('express')
const cors  = require('cors');

class server {

    constructor() {

        this.app = express()

        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios'

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    middlewares() {

        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }


}

module.exports = server;    