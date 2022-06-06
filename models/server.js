const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config')

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            usuariosPath : '/api/usuarios',
            authPath : '/api/auth',
            categogoriasPath : '/api/categorias'
        }

        // database
        this.contectarDB()

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async contectarDB(){
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.paths.authPath, require('../routes/auth'));
        this.app.use( this.paths.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.paths.categogoriasPath, require('../routes/categorias'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
