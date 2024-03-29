const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath  = '/api/usuarios';
        this.recetasPath = '/api/recetas';
        this.authPath = '/api/auth';


        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación

        this.routes();
    }

    async conectarDB(){
        await dbConnection();

    }

    middlewares() {

        // CORS
        this.app.use(cors());
        // Parseo y lectura del body
        this.app.use( express.json() );
        // Directorio P+ublico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.recetasPath, require('../routes/recetas'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
       
    }

    listen(){      
        this.app.listen( this.port, () => {
            console.log('Servidor corriento en puerto', this.port)
        });
    }

}


module.exports = Server;