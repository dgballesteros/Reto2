var express = require('express');
var router = express.Router();

const dataService = require('../data/dataService');

/* Ruta de la Home */
router.get('/', function(req, res, next) {
  let peliculas = dataService.getPeliculas();
  res.render('index', { peliculas : peliculas });
});

/* Ruta de pelicula detalle */
router.get("/pelicula/:pid",function(req,res,next){
  let pelicula = (dataService.getPeliculaById( req.params.pid))
  res.render('pelicula', { pelicula : pelicula })
});

/* Ruta del Login */

router.get('/login', function(req, res, next) {
  res.render('login', {});
})

/* Ruta del Soporte */

router.get('/register', function(req, res, next) {
  res.render('register', {});
})

router.get('/support', function(req, res, next) {
  res.render('support', {});
})

module.exports = router;
