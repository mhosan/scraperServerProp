const express = require('express');         //aca se usa express no para crear un servidor sino para usar las
//rutas del servidor
const router = express.Router();
const preciosCtrl = require('../controllers/controlador'); //se requiere el controlador del crud
const preciosModelo = require('../models/precios');

//cambiar substring
router.put('/update/:stringOri/:stringNuevo', (req, res) => {
    preciosCtrl.cambiarSubstring(req.params.stringOri, req.params.stringNuevo)
        .then (data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    });


//variaciones de precios:
router.get('/variaciones/:producto', (req, res) => {
    preciosCtrl.getVariaciones(req.params.producto)
        .then(variaciones => {
            res.json(variaciones);
        })
        .catch(err => {
            res.send(err);
        });
});

router.get('/', (req, res) => {
    preciosCtrl.getPrecios()
        .then(precios => {
            res.json(precios.data);
        })
        .catch(err => {
            res.json(err);
        })
});

router.get('/:total', (req, res) => {
    preciosCtrl.getTotalRegistros()
        .then(total => {
            res.json(total);
        })
        .catch(err => {
            res.json(err);
        })
});
router.get('/filtrar/:producto', (req, res) => {
    preciosCtrl.getProducto(req.params.producto)
        .then(producto => {
            res.json(producto);
        })
        .catch(err => {
            res.json(err);
        })
});

//POST agregar un nuevo registro
//router.post('/add-course', (req,res) => {
//    const newCourse = new Course({
//        name: req.body.name,
//        code:req.body.code,
//        passMark: req.body.passMark,
//        lecturerInCharge: req.body.lecturerInCharge,
//        subjects: req.body.subjects
//    });
//    newCourse.save()
//        .then(course => res.json(course));
//});
//router.post('/', preciosCtrl.createItem);

//@route DELETE /courses
//Deletes a course
//@access Public
//router.delete('/delete-course/:id', (req,res) => {
//    Course.findById(req.params.id)
//        .then(course => course.remove() . then(() => res.json({success:true})))
//        .catch(err => res.status(404).json({success:false}));
//});
//router.delete('/:id', preciosCtrl.deletePrecio);


module.exports = router;