const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://admin:Ostruca1203@cluster0.rsnsq.mongodb.net/datosprueba?retryWrites=true&w=majority')
    .then(()=>{
        console.log('Conexión a la db ok');
    })
    .catch(err => console.error(err));

module.exports = mongoose;

//db = con.datosprueba
//super = db.supermercados