const path = require('path');
const fs = require('fs');



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

const peliculas = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'peliculas.json'), 'utf8')
);

function getPeliculas() {    
    return peliculas;
}

function getPeliculaById(id) {   
    return peliculas.filter((pelicula) => { return (pelicula.id == id) })[0]
}

module.exports = {
    getPeliculas,
    getPeliculaById,
    validateUser
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



