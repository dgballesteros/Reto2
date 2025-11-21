var express = require('express');
var router = express.Router();

/* Ruta de la Home */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
