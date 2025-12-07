var express = require('express');
var router = express.Router();

const dataService = require('../data/dataService');

/* Ruta de la Home */
router.get('/', function(req, res, next) {
  let peliculas = dataService.getPeliculas();
  res.render('index', { 
    peliculas: peliculas,
    isLogged: req.session.isLogged || false,
    username: req.session.username || null
  });
});

/* Ruta de película detalle */
router.get('/pelicula/:pid', function(req, res, next) {
  let pelicula = dataService.getPeliculaById(req.params.pid);
  res.render('pelicula', { 
    pelicula: pelicula,
    isLogged: req.session.isLogged || false,
    username: req.session.username || null
  });
});

/* Ruta POST para añadir copia a la colección del usuario */
router.post('/pelicula/:pid/add-copy', function(req, res, next) {
  // Middleware de autenticación inline
  if (!req.session || !req.session.isLogged) {
    return res.redirect('/login');
  }
  
  const peliculaId = req.params.pid;
  const { estado, formato } = req.body;
  const username = req.session.username;
  
  // Añadir la copia al usuario
  const result = dataService.addCopyToUser(username, peliculaId, estado, formato);
  
  if (result.success) {
    // Redirigir de vuelta a la página de la película con mensaje de éxito
    res.redirect(`/pelicula/${peliculaId}?success=added`);
  } else {
    // Si hay error, redirigir también pero podrías mostrar un mensaje de error
    res.redirect(`/pelicula/${peliculaId}`);
  }
});

/* Ruta del Soporte */
router.get('/support', function(req, res, next) {
  res.render('support', { 
    isLogged: req.session.isLogged || false,
    username: req.session.username || null
  });
});

/* Ruta protegida: Catálogo */
router.get('/catalogo', function(req, res, next) {
  // Middleware de autenticación inline
  if (!req.session || !req.session.isLogged) {
    return res.redirect('/login');
  }
  
  let peliculas = dataService.getPeliculas();
  res.render('catalogo', { 
    peliculas: peliculas,
    isLogged: true,
    username: req.session.username
  });
});

module.exports = router;
