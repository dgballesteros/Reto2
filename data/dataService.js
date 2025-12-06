const path = require('path');
const fs = require('fs');
const { request } = require('http');

const usuarios = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'user-data.json'), 'utf8')
);


function validateUser(email, password) {
    let query = usuarios.filter((usuario => { return (usuario.username == email) }))

    if (query.length>0) {
        if (query[0].password == password) {
            return true;
        } else {
            return false;
        }
    }
}

function addNewUser(username, password) {
    // Cargar usuarios actuales
    const filePath = path.join(__dirname, 'user-data.json');
    let usuarios = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
    // Validar que el username no esté vacío
    if (!username || username.trim() === '') {
        return { success: false, error: 'El nombre de usuario es obligatorio' };
    }
  
    // Validar password
    if (!validatePassword(password)) {
        return { success: false, error: 'La contraseña debe tener al menos 8 caracteres' };
    }
  
    // Revisar si ya existe el usuario
    const existe = usuarios.some(u => u.username === username.trim());
    if (existe) {
        return { success: false, error: 'El nombre de usuario ya existe' };
    }
  
    // Agregar usuario
    const nuevoUsuario = {
        username: username.trim(),
        password: password,
        copies: []
    };
    usuarios.push(nuevoUsuario);
  
    // Guardar archivo actualizado
    try {
        fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
        return { success: true, error: null };
    } catch (err) {
        console.error('Error al guardar usuario:', err);
        return { success: false, error: 'Error al guardar el usuario. Inténtalo de nuevo.' };
    }
}

function validateEmail(email) {
    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (patron.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {
    if (password.length >= 8) {
        return true;
    } else {
        return false;
    }
}

const peliculas = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'peliculas.json'), 'utf8')
);

function getPeliculas() {    
    return peliculas;
}

function getPeliculaById(id) {   
    return peliculas.filter((pelicula) => { return (pelicula.id == id) })[0]
}

function getUserCopies(username) {
    // Cargar usuarios actualizados desde el archivo
    const filePath = path.join(__dirname, 'user-data.json');
    const usuariosActualizados = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Buscar el usuario
    const usuario = usuariosActualizados.find(u => u.username === username);
    
    if (!usuario || !usuario.copies) {
        return [];
    }
    
    // Combinar las copias del usuario con la información de las películas
    const copiasConPelicula = usuario.copies.map((copia, index) => {
        const pelicula = getPeliculaById(copia.id_movie);
        return {
            numeroCopia: index + 1,
            arrayIndex: index, // Índice real en el array para poder eliminarlo
            id_movie: copia.id_movie,
            estado: copia.estado,
            formato: copia.format,
            pelicula: pelicula || null // Si no existe la película, será null
        };
    });
    
    return copiasConPelicula;
}

function addCopyToUser(username, idMovie, estado, formato) {
    const filePath = path.join(__dirname, 'user-data.json');
    let usuarios = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Buscar el usuario
    const usuarioIndex = usuarios.findIndex(u => u.username === username);
    
    if (usuarioIndex === -1) {
        return { success: false, error: 'Usuario no encontrado' };
    }
    
    // Verificar que la película existe
    const pelicula = getPeliculaById(idMovie);
    if (!pelicula) {
        return { success: false, error: 'Película no encontrada' };
    }
    
    // Inicializar el array de copias si no existe
    if (!usuarios[usuarioIndex].copies) {
        usuarios[usuarioIndex].copies = [];
    }
    
    // Añadir la nueva copia
    const nuevaCopia = {
        id_movie: parseInt(idMovie),
        estado: estado,
        format: formato
    };
    
    usuarios[usuarioIndex].copies.push(nuevaCopia);
    
    // Guardar archivo actualizado
    try {
        fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
        return { success: true, error: null };
    } catch (err) {
        console.error('Error al guardar copia:', err);
        return { success: false, error: 'Error al guardar la copia. Inténtalo de nuevo.' };
    }
}

function deleteCopyFromUser(username, copyIndex) {
    const filePath = path.join(__dirname, 'user-data.json');
    let usuarios = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Buscar el usuario
    const usuarioIndex = usuarios.findIndex(u => u.username === username);
    
    if (usuarioIndex === -1) {
        return { success: false, error: 'Usuario no encontrado' };
    }
    
    // Verificar que el usuario tenga copias
    if (!usuarios[usuarioIndex].copies || usuarios[usuarioIndex].copies.length === 0) {
        return { success: false, error: 'El usuario no tiene copias' };
    }
    
    // Verificar que el índice sea válido
    const index = parseInt(copyIndex);
    if (isNaN(index) || index < 0 || index >= usuarios[usuarioIndex].copies.length) {
        return { success: false, error: 'Índice de copia inválido' };
    }
    
    // Eliminar la copia del array
    usuarios[usuarioIndex].copies.splice(index, 1);
    
    // Guardar archivo actualizado
    try {
        fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
        return { success: true, error: null };
    } catch (err) {
        console.error('Error al eliminar copia:', err);
        return { success: false, error: 'Error al eliminar la copia. Inténtalo de nuevo.' };
    }
}

module.exports = {
    getPeliculas,
    getPeliculaById,
    validateUser,
    validateEmail,
    validatePassword,
    addNewUser,
    getUserCopies,
    addCopyToUser,
    deleteCopyFromUser
}

/*

function saveProductosTienda() {
    fs.writeFileSync(
        path.join(__dirname, 'peliculas.json'),
        JSON.stringify(peliculas),
        'utf8'
    );
}

function deleteProductoById(id) {
    const originalLength = productosTienda.length;
    const nuevaLista = productosTienda.filter(e => e.id != id);
    // Primero, comprobamos si la nueva lista de productos tiene una longitud diferente a la lista original.
    // Esto significa que se eliminó un producto.
    if (nuevaLista.length !== originalLength) {
        // Vaciamos el array productosTienda actual 
        // y añadimos todos los elementos de la nueva lista al array vaciado.
        productosTienda.length = 0;
        productosTienda.push(...nuevaLista);
        saveProductosTienda();
        return true;
    }
    return false;
}
    
*/



