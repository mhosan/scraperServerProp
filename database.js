/*
Para instalar la libreria mongoose: npm install mongoose.

*/

const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/dbPrueba')
    .then(()=>{
        console.log('Conexión a la db ok');
    })
    .catch(err => console.error(err));

module.exports = mongoose;