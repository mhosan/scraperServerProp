const express = require('express');         //aca se usa express no para crear un servidor sino para usar las
                                            //rutas del servidor
const router = express.Router();
const preciosCtrl = require('../controllers/controlador'); //se requiere el controlador del crud
const preciosModelo = require('../models/precios');

//router.get('/', preciosCtrl.getPrecios);  //esto es que hago cuando me pidan la ruta raiz del servidor, como
                                            //respondo a eso. Ahora estoy usando un controlador, pero tambien 
                                            //se puede poner una arrow function ahi, despues de la coma de la ruta,
                                            //como segundo parametro.
router.get('/', async (req, res) => {
    const caca = await preciosModelo.find({'supermercado' : "Dia"}); 
    res.json(caca);
}
); 

router.post('/', preciosCtrl.createItem);

router.get('/:id', preciosCtrl.getPrecios);//esto es /id, ojo, no es un parametro de la forma ?id=9849389 sino 
                                            //que es un parametro que en node se define con dos puntos, pero en
                                            //la url que llega al server viene despues de un "/"

router.put('/:id', preciosCtrl.editPrecio);

router.delete('/:id', preciosCtrl.deletePrecio);


module.exports = router;