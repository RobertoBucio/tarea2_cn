// src/app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Importar rutas
const indexRouter = require('./routes/index'); 
// si tienes más rutas, agrégalas aquí:
// const usersRouter = require('./routes/users');

const app = express();

// Configuración del motor de vistas
app.set('views', path.join(__dirname, '..', 'views')); // carpeta views en raíz
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));                 // logs HTTP
app.use(express.json());                // parsea JSON
app.use(express.urlencoded({ extended: true })); // parsea forms
app.use(cookieParser());                // parsea cookies

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas
app.use('/', indexRouter);
// app.use('/users', usersRouter); // ejemplo si agregas otra ruta

// Manejo de error 404
app.use((req, res, next) => {
  res.status(404).render('error', {
    message: 'Página no encontrada',
    error: {}
  });
});

// Manejador de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
