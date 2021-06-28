const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection');

// Agregar Libro
router.post('/addLibro', (req, res) => {

    const { isbn, titulo, autor, editorial, annio, tapa, precio } = req.body;
    const query = 'CALL nuevoLibro(?,?,?,?,?,?,?)';
    mysqlConnection.query(query, [isbn, titulo, autor, editorial, annio, tapa, precio], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Listar Libros
router.get('/getallLibros', (req, res) => {

    const id = req.query.id;

    var query = '';

    if (id == 0 || id == null) {
        query = 'select * from libro'
    } else {
        query = 'select * from libro where libroId = ?';
    }

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Actualizar Libros
router.put('/updateLibro', (req, res) => {

    const id = req.query.id;
    const { isbn, titulo, autor, editorial, annio, tapa, precio } = req.body;
    const query = 'CALL updateLibro(?,?,?,?,?,?,?,?)';

    mysqlConnection.query(query, [id, isbn, titulo, autor, editorial, annio, tapa, precio], (err, rows, fields) => {

        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Eliminar Libro
router.delete('/deleteLibro', (req, res) => {

    const id = req.query.id;
    const query = `CALL deleteLibro(?)`;

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;