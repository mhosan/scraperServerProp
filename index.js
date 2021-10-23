/*
crear un proyecto de nodejs: 'npm init --yes'
Esto genera el archivo "packaje.json" con una configuración de ejemplo.

Instalar Express, el framework del lado back. Para instalar Express: 'npm install express'

Instalar nodemon para el reincio automatico del server en cada modificación 
que se guarde: 'npm install nodemon -D'
-D se agrega para que lo agregue en la parte de dependencias de desarrollo en el
archivo package.json, en la zona de "scripts". Agregar: "dev": "nodemon server/index.js"

Instalar Morgan para manejar midlewares, las rutas y los request / response. También 
muestra por consola los mensajes del servidor. Ejemplo: GET /api/usuarios/5b5115f588452701d0c7a9f2 200 57.322 ms - 131
esto quiere decir que el navegador realizó un GET al servidor, a la url /api/usuarios/iduser, el 
servidor le respondió con un codigo "200", la respuesta tardó 57,322 milisegundos y el tamaño del
archivo de respuesta es de 131 b.
Para instalar Morgan: 'npm install morgan'

*/
const express = require('express');
const morgan = require('morgan');           //para ver mesajes en el servidor
const cors = require('cors');
const app = express();
const { mongoose } = require('./database'); //importar desde el archivo con la conexion a la bd solamente la conexion
                                            //no se esta importando todo el archivo sino solo la conexion. Al 
                                            //importar se ejecuta.
//settings
//app.set('port', 3000);                    //definir una variable de app
app.set('port', process.env.PORT || 3000);  //usar el puerte que me asigne el serv hosting
                                            //si el puerto no existe, utilizar el 3000

//midlewares
app.use(morgan('dev'));                     //ver los mensajes en el servidor
//app.use(morgan((tokens, req, res)=>));
app.use(express.json());                    //que el servidor entienda los datos json que envia el front angular

//app.use(cors({origin: 'http://localhost:4200'}));
//app.use(cors({origin: 'https://proxy.local.arba.gov.ar:8080'}));
app.use(cors());                            //es un midleware (una funcion)

//routes
app.use('/api/precios',require('./routes/rutas.js'));  // el primer parametro es la ruta por default, o sea que  
                                                        // despues de localhost (o la url del server) viene 
                                                        // "/api/precios" como prefijo. Se agrega a la ruta '/'

//start el server
app.listen(app.get('port'), () => {
    console.log("Server escuchando en el puerto", app.get('port'));
});
