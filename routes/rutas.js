const express = require('express');         //aca se usa express no para crear un servidor sino para usar las
                                            //rutas del servidor
const router = express.Router();
const usuariosCtrl = require('../controllers/controlador'); //se requiere el controlador del crud

router.get('/', usuariosCtrl.getUsuarios);  //esto es que hago cuando me pidan la ruta raiz del servidor, como
                                            //respondo a eso. Ahora estoy usando un controlador, pero tambien 
                                            //se puede poner una arrow function ahi, despues de la coma de la ruta,
                                            //como segundo parametro.

router.post('/', usuariosCtrl.createUsuario);

router.get('/:id', usuariosCtrl.getUsuario);//esto es /id, ojo, no es un parametro de la forma ?id=9849389 sino 
                                            //que es un parametro que en node se define con dos puntos, pero en
                                            //la url que llega al server viene despues de un "/"

router.put('/:id', usuariosCtrl.editUsuario);

router.delete('/:id', usuariosCtrl.deleteUsuario);


module.exports = router;