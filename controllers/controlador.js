const express = require('express');
const router = express.Router();
const supermercados = require('../models/precios');
const preciosControlador = {};                     //creo un objeto que luego voy a exportar

//get
preciosControlador.getPrecios = function() {
    return new Promise((resolve, reject) => {
        supermercados.find({'supermercado': 'Vea'}).exec().then(data => {
            resolve({'status': 200, 'message':'get all data', 'data': data});
        }).catch(err => {
            reject({'status': 404, 'message':'err:-'+err});
        })
    })
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
/*this.update = function(id, updateData) {
    return new Promise((resolve, reject) => {
        UserSchema.update({_id: id}, updateData).then(() => {
            resolve({'status': 200, 'message':'update user'});
        }).catch(err => {
            reject({'status': 404, 'message':'err:-'+err});
        })
    })
}*/
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
/*this.delete = function(id) {
    return new Promise((resolve, reject) => {
        UserSchema.remove({_id: id}).then(() => {
            resolve({'status': 200, 'message':'delete user'});
        }).catch(err => {
            reject({'status': 404, 'message':'err:-'+err});
        })
    })
}*/
preciosControlador.deletePrecio = async (req, res) => {
    await supermercados.findByIdAndRemove(req.params.id);//usamos async / await porque puede tomar algo de tiempo la respuesta
    res.json({ status: 'precio borrado Ok' });
};


module.exports = preciosControlador;
