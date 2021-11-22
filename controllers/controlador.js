const express = require('express');
const router = express.Router();
const supermercados = require('../models/precios');
const preciosControlador = {};                     //creo un objeto que luego voy a exportar

//aggregate:
preciosControlador.getVariaciones = function (producto) {
    return new Promise((resolve, reject) => {
        supermercados.aggregate([
            {
                $match: {
                    descrip: { $regex: new RegExp(producto, "ig") }
                }
            },
            {
                $group: {
                    /*_id: "$descrip", precio: { $avg: "$precio" },
                    variacion: { $avg: "$variacion" },
                    cantidad: { $sum: 1 } */
                    _id : {descripcion : "$descrip", precio: "$precio" },
                    cantidad: { $sum: 1 }
                }
            }
        ]).exec()
            .then(data => {
                resolve({ 'status': 200, 'message': 'get producto', 'data': data });
            })
            .catch(err => {
                reject({ 'status': 404, 'message': 'err:-' + err });
            })
    });
}

//get sin parametros:
preciosControlador.getPrecios = function () {
    return new Promise((resolve, reject) => {
        const totalRegistrosMostrar = 200;
        supermercados.count().exec()
            .then(count => {
                const totalSkip = count - totalRegistrosMostrar;
                //supermercados.find({}).select("-_id").limit(300).exec()
                //supermercados.find({}).exec()
                supermercados.find().skip(totalSkip).exec()
                .then(data => {
                    resolve({ 'status': 200, 'message': 'get last data', 'data': data });
                })
                .catch(err =>{
                    reject({ 'status': 404, 'message': 'err:-' + err });
                })
            })
            .catch(err => {
                reject({'status': 404, 'message':'err:-'+err});
            })
    })
}

//get total de registros:
preciosControlador.getTotalRegistros = function () {
    return new Promise((resolve, reject) => {
        supermercados.count().exec()
            .then(count => {
                resolve({ 'status': 200, 'message': 'get total registros', 'data': count });
            })
            .catch(err => {
                reject({ 'status': 404, 'message': 'err:-' + err });
            })
    });
}

//get de un solo prodcto:
preciosControlador.getProducto = function (producto) {
    return new Promise((resolve, reject) => {
        supermercados.find({ descrip : {$regex: new RegExp(producto, "ig")} }).exec()
            .then(data => {
                resolve({ 'status': 200, 'message': 'get producto', 'data': data });
            })
            .catch(err => {
                reject({ 'status': 404, 'message': 'err:-' + err });
            })
    });
}


preciosControlador.cambiarSubstring = function (substringOriginal, substringNuevo) {
    return new Promise((resolve, reject) => {
        supermercados.find({ descrip : {$regex: new RegExp(substringOriginal, "ig")} }).exec()
        //supermercados.updateMany({ descrip: { $regex: new RegExp(substringEditar, "ig") } }, { $set: { descrip: nuevoValor } }).exec()
            .then(data => {
                for (registro in data) {
                    let descripcion = data[registro].descrip;
                    descripcion = descripcion.replace(substringOriginal, substringNuevo);
                    supermercados.updateOne({ descrip: data[registro].descrip }, { $set: { descrip: descripcion } }).exec()
                    .then(data => {
                        resolve({ 'status': 200, 'message': 'put producto', 'data': data });
                    })
                    .catch(err => {
                        reject({ 'status': 404, 'message': 'err:-' + err });
                    })  
                }
            })
            .catch(err => {
                reject({ 'status': 404, 'message': 'err:-' + err });
            })
    });
}


//get con id
/*
this.getSingle = function(id) {
        return new Promise((resolve, reject) => {
            UserSchema.find({_id: id}).exec().then(data => {
                resolve({'status': 200, 'message':'get single data', 'data': data});
            }).catch(err => {
                reject({'status': 404, 'message':'err:-'+err});
            })
        })
    }
};
*/

//post
/*
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
}*/

//put
/*this.update = function(id, updateData) {
    return new Promise((resolve, reject) => {
        UserSchema.update({_id: id}, updateData).then(() => {
            resolve({'status': 200, 'message':'update user'});
        }).catch(err => {
            reject({'status': 404, 'message':'err:-'+err});
        })
    })
}*/

/*
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
};*/

//delete
/*this.delete = function(id) {
    return new Promise((resolve, reject) => {
        UserSchema.remove({_id: id}).then(() => {
            resolve({'status': 200, 'message':'delete user'});
        }).catch(err => {
            reject({'status': 404, 'message':'err:-'+err});
        })
    })
}*/

/*
preciosControlador.deletePrecio = async (req, res) => {
    await supermercados.findByIdAndRemove(req.params.id);//usamos async / await porque puede tomar algo de tiempo la respuesta
    res.json({ status: 'precio borrado Ok' });
};
*/

module.exports = preciosControlador;
