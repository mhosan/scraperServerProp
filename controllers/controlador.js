const supermercados = require('../models/precios');
const preciosControlador = {};                     //creo un objeto que luego voy a exportar

//get
preciosControlador.getPrecios = async (req, res) => { // Hay que esperar hasta que llegue la respuesta, 
    const caca = await supermercados.find();        // esto se podria resolver con un callback, o con una
    res.json(caca);
};

// Si fuera con un callback: 
// ..= (req, res) => {
//      precioModelo.find( function(resultado, error) {
//          })
//      }
// Si fuera con promesas:
// ..= (req, res) => {
//      precioModelo.find
//          .then(()=>{ })
//          .catch(()=>{ })
//      }
// async / await es un concepto nuevo en javascript.
// si algo va a tomar tiempo, se agrega el "async" antes de la 
// funcion y en el resultado que va a demorar se pone que lo
// espere con "await"

//get con id
preciosControlador.getPrecios = async (req, res) => {
    const precio = await supermercados.findById(req.params.id);
    res.json({                                          //en "req.params.id" se recuperan los parametros enviados
        precio
    });
};

//post
preciosControlador.createItem = async (req, res) => {
    //console.log(req.body);
    const item = new supermercados({
        _id: req.body.id,                               //en "req.body" se recuperan los datos enviados en el post
        supermercado: req.body.supermercado,                       //con headers = ContentsType:application/json
        fecha: req.body.fecha,
        descrip: req.body.descrip,
        precio: req.body.precio
    });
    await item.save();
    res.json({
        'status': 'Nuevo item guardado Ok'
    });
}

//put
preciosControlador.editPrecio = async (req, res) => {
    const { id } = req.params;                          //quiero solo el id y guardarlo en una constante
    const precio = {
        supermercado: req.body.supermercado,
        fecha: req.body.fecha,
        descrip: req.body.descrip,
        precio: req.body.precio
    };
    await supermercados.findByIdAndUpdate(id, { $set: precio }, { new: true });
    //$set es un metodo de mongodb para actualizar datos. Y el new:true es
    //por si el dato no existe, por lo tanto que si no existe, lo cree.
    res.json({ status: 'precio actualizado Ok' });
};

//delete
preciosControlador.deletePrecio = async (req, res) => {
    await supermercados.findByIdAndRemove(req.params.id);//usamos async / await porque puede tomar algo de tiempo la respuesta
    res.json({ status: 'precio borrado Ok' });
};


module.exports = preciosControlador;
