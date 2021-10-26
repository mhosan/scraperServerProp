const mongoose = require ('mongoose');
require('dotenv').config({path: 'environment.env'});

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('Conexión a la db ok');
    })
    .catch(err => console.error(err));

module.exports = mongoose;

//db = con.datosprueba
//super = db.supermercados