const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection');

// Agregar Sucursal
router.post('/addSucursal', (req, res) => {

    const { nombre, direccion, encargado, comunaId } = req.body;
    const query = 'CALL nuevaSucursal(?,?,?,?)';
    mysqlConnection.query(query, [nombre, direccion, encargado, comunaId], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Listar Sucursales
router.get('/getallSucursales', (req, res) => {

    const id = req.query.id;

    var query = '';

    if (id == 0 || id == null) {
        query = 'select * from view_getallsucursales'
    } else {
        query = 'select * from view_getallsucursales where sucursalId = ?';
    }

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Actualizar Sucursal
router.put('/updateSucursal', (req, res) => {

    const id = req.query.id;
    const { nombre, direccion, encargado, comunaId } = req.body;
    const query = 'CALL updateSucursal(?,?,?,?,?)';

    mysqlConnection.query(query, [id, nombre, direccion, encargado, comunaId], (err, rows, fields) => {

        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Eliminar Sucursal
router.delete('/deleteSucursal', (req, res) => {

    const id = req.query.id;
    const query = `CALL deleteSucursal(?)`;

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;