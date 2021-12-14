const mongoose = require('mongoose');   //aca se usa mongoose para modelar los datos y no para conectarse
const { Schema } = mongoose;

/* const supermercados = new Schema({
    supermercado: { type: String, required: true },
    fecha: { type: Date, required: true },
    descrip: { type: String, required: true },
    precio: { type: Number, required: true }
});
 */
const propiedades = new Schema({
    "IdPropiedad " : { type: Number, required: false }
})

module.exports = mongoose.model('propiedades', propiedades);