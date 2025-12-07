var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'sesionId', // nombre de la cookie
  secret: 'clavedesessionmuycomplejaparaencriptarlacookie',
  resave: false, // no reescribe si no hay cambios
  saveUninitialized: false, // no guarda sesiones vacías
  cookie: {
    httpOnly: true,
    secure: false, // true si usas HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 día (milisegundos * segundos * minutos * horas)
  }
}));

// Middleware para pasar variables de sesión a todas las vistas

app.use(function(req, res, next) {
  res.locals.isLogged = req.session.isLogged || false;
  res.locals.username = req.session.username || null;
  next();
});

app.use('/', indexRouter);
app.use('/', usersRouter); // Rutas de usuarios: /login, /register, /logout, /mi-coleccion


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
