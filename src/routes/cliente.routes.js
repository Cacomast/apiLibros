const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection');

// Agregar Cliente
router.post('/addCliente', (req, res) => {

    const { rut, dv, nombre, direccion, telefono, correo, valor, comunaId } = req.body;
    const query = 'CALL nuevoCliente(?,?,?,?,?,?,?,?)';
    mysqlConnection.query(query, [rut, dv, nombre, direccion, telefono, correo, valor, comunaId], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Listar Clientes
router.get('/getallClientes', (req, res) => {

    const id = req.query.id;

    var query = '';

    if (id == 0 || id == null) {
        query = 'select * from view_getallclientes'
    } else {
        query = 'select * from view_getallclientes where clienteId = ?';
    }

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Actualizar Cliente
router.put('/updateSucursal', (req, res) => {

    const id = req.query.id;
    const { rut, dv, nombre, direccion, telefono, coreo, valor, comunaId } = req.body;
    const query = 'CALL updateSucursal(?,?,?,?,?,?,?,?)';

    mysqlConnection.query(query, [id, rut, dv, nombre, direccion, telefono, coreo, valor, comunaId], (err, rows, fields) => {

        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Eliminar Cliente
router.delete('/deleteCliente', (req, res) => {

    const id = req.query.id;
    const query = `CALL deleteCliente(?)`;

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;