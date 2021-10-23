const usuarioModelo = require('../models/usuarios');
const usuariosControlador = {};                     //creo un objeto que luego voy a exportar

//get
usuariosControlador.getUsuarios = async (req, res) => { // Hay que esperar hasta que llegue la respuesta, 
    const usuarios = await usuarioModelo.find();        // esto se podria resolver con un callback, o con una
    res.json(usuarios);                                 // promesa, o con async / await.
}                                                       // Si fuera con un callback: 
                                                        // ..= (req, res) => {
                                                        //      usuarioModelo.find( function(resultado, error) {
                                                        //          })
                                                        //      }
                                                        // Si fuera con promesas:
                                                        // ..= (req, res) => {
                                                        //      usuarioModelo.find
                                                        //          .then(()=>{ })
                                                        //          .catch(()=>{ })
                                                        //      }
                                                        // async / await es un concepto nuevo en javascript.
                                                        // si algo va a tomar tiempo, se agrega el "async" antes de la 
                                                        // funcion y en el resultado que va a demorar se pone que lo
                                                        // espere con "await"

//get con id
usuariosControlador.getUsuario = async (req, res) =>{
    const usuario = await usuarioModelo.findById(req.params.id);
    res.json({                                          //en "req.params.id" se recuperan los parametros enviados
        usuario
    });
};

//post
usuariosControlador.createUsuario = async (req, res) => {
    //console.log(req.body);
    const usuario = new usuarioModelo({
        _id: req.body.id,                               //en "req.body" se recuperan los datos enviados en el post
        nombre : req.body.nombre,                       //con headers = ContentsType:application/json
        apellido : req.body.apellido,
        edad : req.body.edad,
        usuario : req.body.usuario
    });
    await usuario.save();
    res.json({
        'status' : 'Usuario guardado Ok'
    });
}

//put
usuariosControlador.editUsuario = async (req, res) =>{
    const { id } = req.params;                          //quiero solo el id y guardarlo en una constante
    const usuario = {
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        edad : req.body.edad,
        usuario : req.body.usuario
    };
    await usuarioModelo.findByIdAndUpdate(id, {$set: usuario},{new: true}); 
                                                        //$set es un metodo de mongodb para actualizar datos. Y el new:true es
                                                        //por si el dato no existe, por lo tanto que si no existe, lo cree.
    res.json({status: 'Usuario actualizado Ok'});
};

//delete
usuariosControlador.deleteUsuario = async (req, res) =>{
    await usuarioModelo.findByIdAndRemove(req.params.id);//usamos async / await porque puede tomar algo de tiempo la respuesta
    res.json({status : 'Usuario borrado Ok'});
};


module.exports = usuariosControlador;
