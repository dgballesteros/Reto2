var express = require('express');
var router = express.Router();

const dataService = require('../data/dataService');

// Middleware de autenticación
function requireAuth(req, res, next) {
  if (req.session && req.session.isLogged) {
    return next();
  }
  res.redirect('/login');
}

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
router.post('/pelicula/:pid/add-copy', requireAuth, function(req, res, next) {
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

/* Ruta del Login */
router.get('/login', function(req, res, next) {
  // Si ya está logueado, que no vuelva a login
  if (req.session && req.session.isLogged) {
    return res.redirect('/');
  }
  res.render('login', { 
    error: null,
    isLogged: false,
    username: null
  });
});

/* Ruta del Register */
router.get('/register', function(req, res, next) {
  // Si ya está logueado, redirigir al inicio
  if (req.session && req.session.isLogged) {
    return res.redirect('/');
  }
  res.render('register', { 
    isLogged: false,
    username: null,
    error: null
  });
});

/* Ruta POST del Register */
router.post('/register', function(req, res, next) {
  const { username, password, repeatPassword } = req.body;
  
  // Validar que las contraseñas coincidan
  if (password !== repeatPassword) {
    return res.render('register', {
      isLogged: false,
      username: null,
      error: 'Las contraseñas no coinciden'
    });
  }
  
  // Validar que el nombre de usuario no esté vacío
  if (!username || username.trim() === '') {
    return res.render('register', {
      isLogged: false,
      username: null,
      error: 'El nombre de usuario es obligatorio'
    });
  }
  
  // Intentar crear el usuario
  const result = dataService.addNewUser(username.trim(), password);
  
  if (result.success) {
    // Si el registro es exitoso, iniciar sesión automáticamente
    req.session.isLogged = true;
    req.session.username = username.trim();
    res.redirect('/');
  } else {
    // Si hay error, mostrar el mensaje de error
    res.render('register', {
      isLogged: false,
      username: null,
      error: result.error
    });
  }
});

/* Ruta del Soporte */
router.get('/support', function(req, res, next) {
  res.render('support', { 
    isLogged: req.session.isLogged || false,
    username: req.session.username || null
  });
});

/* Ruta protegida: Mi colección */
router.get('/mi-coleccion', requireAuth, function(req, res, next) {
  const copiasUsuario = dataService.getUserCopies(req.session.username);
  res.render('mi-coleccion', { 
    isLogged: true,
    username: req.session.username,
    copias: copiasUsuario
  });
});

/* Ruta POST para eliminar copia de la colección del usuario */
router.post('/mi-coleccion/delete-copy', requireAuth, function(req, res, next) {
  const { copyIndex } = req.body;
  const username = req.session.username;
  
  // Eliminar la copia del usuario
  const result = dataService.deleteCopyFromUser(username, copyIndex);
  
  if (result.success) {
    // Redirigir de vuelta a mi-coleccion con mensaje de éxito
    res.redirect('/mi-coleccion?success=deleted');
  } else {
    // Si hay error, redirigir también pero podrías mostrar un mensaje de error
    res.redirect('/mi-coleccion');
  }
});

/* Ruta protegida: Catálogo */
router.get('/catalogo', requireAuth, function(req, res, next) {
  let peliculas = dataService.getPeliculas();
  res.render('catalogo', { 
    peliculas: peliculas,
    isLogged: true,
    username: req.session.username
  });
});

/* Ruta para cerrar sesión */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.log('Error al cerrar sesión:', err);
    }
    res.redirect('/?success=logout');
  });
});

module.exports = router;
