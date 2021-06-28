const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection');

// Agregar Venta
router.post('/addVenta', (req, res) => {

    const { valorNeto, iva, valorTotal, fechaVenta, medioPago, tipoDespacho, clienteId, tipoDocumento, sucursalId } = req.body;
    const query = 'CALL nuevaVenta(?,?,?,?,?,?,?,?,?)';
    mysqlConnection.query(query, [valorNeto, iva, valorTotal, fechaVenta, medioPago, tipoDespacho, clienteId, tipoDocumento, sucursalId], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Agregar Detalle Venta
router.post('/addDetalleVenta', (req, res) => {

    const { libroId, ventaId, cantidad } = req.body;
    const query = 'CALL nuevoDetalleVenta(?,?,?)';
    mysqlConnection.query(query, [libroId, ventaId, cantidad], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;