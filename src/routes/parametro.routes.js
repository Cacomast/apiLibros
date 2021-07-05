const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection');

// Agregar Parámetro
router.post('/addParametro', (req, res) => {

    const { key, valor, descripcion } = req.body;
    const query = 'CALL nuevoParametro(?,?,?)';
    mysqlConnection.query(query, [key, valor, descripcion], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Listar Parámetros
router.get('/getallParametros', (req, res) => {

    const id = req.query.id;

    var query = '';

    if (id == 0 || id == null) {
        query = `select * from parametro`
    } else {
        query = `select * from parametro where parametroId = ?`;
    }

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Actualizar Parámetro
router.put('/updateParametro', (req, res) => {

    const id = req.query.id;
    const { key, valor, descripcion } = req.body;
    const query = 'CALL updateParametro(?,?,?,?)';

    mysqlConnection.query(query, [id, key, valor, descripcion], (err, rows, fields) => {

        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;