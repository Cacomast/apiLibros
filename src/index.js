const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Routes
app.use('/api/inventario/', require('./routes/inventario.routes'));
app.use('/api/libro/', require('./routes/libro.routes'));
app.use('/api/sucursal/', require('./routes/sucursal.routes'));
app.use('/api/comuna/', require('./routes/comuna.routes'));
app.use('/api/cliente/', require('./routes/cliente.routes'));
app.use('/api/transaccion/', require('./routes/transaccion.routes'));
app.use('/api/parametro/', require('./routes/parametro.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});