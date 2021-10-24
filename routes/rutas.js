const express = require('express');         //aca se usa express no para crear un servidor sino para usar las
//rutas del servidor
const router = express.Router();
const preciosCtrl = require('../controllers/controlador'); //se requiere el controlador del crud
const preciosModelo = require('../models/precios');

router.get('/', (req, res) => {
    preciosCtrl.getPrecios()
        .then(precios => {
            res.json(precios.data);
        })
        .catch(err => {
            res.json(err);
        })
    });

//@route POST /courses
//Adds a new course
//@access Public
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
router.post('/', preciosCtrl.createItem);

//@route GET /course
//Gets a particular course
//@access Public
//router.get('/get-course/:id', (req,res) => {
//    Course.findById(req.params.id)
//        .then(course => res.json(course));
//});
router.get('/:id', preciosCtrl.getPrecios);//esto es /id, ojo, no es un parametro de la forma ?id=9849389 sino 
//que es un parametro que en node se define con dos puntos, pero en
//la url que llega al server viene despues de un "/"

router.put('/:id', preciosCtrl.editPrecio);

//@route DELETE /courses
//Deletes a course
//@access Public
//router.delete('/delete-course/:id', (req,res) => {
//    Course.findById(req.params.id)
//        .then(course => course.remove() . then(() => res.json({success:true})))
//        .catch(err => res.status(404).json({success:false}));
//});
router.delete('/:id', preciosCtrl.deletePrecio);


module.exports = router;