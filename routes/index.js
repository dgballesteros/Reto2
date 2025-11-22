var express = require('express');
var router = express.Router();

const dataService = require('../data/dataService');

/* Ruta de la Home */
router.get('/', function(req, res, next) {
  let peliculas = dataService.getPeliculas();
  let peliculasSlider = dataService.getPeliculasSlider();
  res.render('index', { peliculas : peliculas, peliculasSlider : peliculasSlider });
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
