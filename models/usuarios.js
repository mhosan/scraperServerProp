const mongoose = require('mongoose');   //aca se usa mongoose para modelar los datos y no para conectarse
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    usuario: { type: String, required: true }
});

module.exports = mongoose.model('usuarios', usuarioSchema);