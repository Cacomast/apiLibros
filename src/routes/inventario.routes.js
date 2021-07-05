const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection');

// Obtener stock de libros
router.get('/getInventario', (req, res) => {
    mysqlConnection.query('SELECT * FROM view_listarinventario', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Obtener stock de libros por sucursal
router.get('/getInventarioSucursal', (req, res) => {
    const id = req.query.id;
    const query = 'SELECT * FROM view_getinventariosucursal where libroId = ?';
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// disminuir el stock de libros por sucursal
router.put('/restarStock', (req, res) => {
    const { libroId, sucursalId, cantidad } = req.body;
    const query = 'CALL restarStock(?,?,?)';
    mysqlConnection.query(query, [libroId, sucursalId, cantidad], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Actualizar el stock de libros por sucursal
router.put('/updateStock', (req, res) => {
    const { libroId, sucursalId, cantidad } = req.body;
    const query = 'CALL updateStock(?,?,?)';
    mysqlConnection.query(query, [libroId, sucursalId, cantidad], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;