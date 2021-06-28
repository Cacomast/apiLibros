const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection');

// Agregar Comuna
router.post('/addComuna', (req, res) => {

    const { nombre, regionId } = req.body;
    const query = 'CALL nuevaComuna(?,?)';
    console.log(req.body);
    mysqlConnection.query(query, [nombre, regionId], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Listar Comunas
router.get('/getallComunas', (req, res) => {

    const id = req.query.id;

    var query = '';

    if (id == 0 || id == null) {
        query = 'select * from view_getallcomunas'
    } else {
        query = 'select * from view_getallcomunas where comunaId = ?';
    }

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Actualizar Comuna
router.put('/updateComuna', (req, res) => {

    const id = req.query.id;
    const { nombre, regionId } = req.body;
    const query = 'CALL updateComuna(?,?,?)';

    mysqlConnection.query(query, [id, nombre, regionId], (err, rows, fields) => {

        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Eliminar Comuna
router.delete('/deleteComuna', (req, res) => {

    const id = req.query.id;
    const query = `CALL deleteComuna(?)`;

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Listar Regiones
router.get('/getallRegiones', (req, res) => {

    const id = req.query.id;

    var query = '';

    if (id == 0 || id == null) {
        query = 'select * from region'
    } else {
        query = 'select * from region where regionId = ?';
    }

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;