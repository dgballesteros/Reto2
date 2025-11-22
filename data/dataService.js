const path = require('path');
const fs = require('fs');

const peliculas = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'peliculas.json'), 'utf8')
);

const peliculasSlider = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'peliculas-slider.json'), 'utf-8')
);

function getPeliculasSlider(){
    return peliculasSlider;
}

function getPeliculas() {    
    return peliculas;
}

function getPeliculaById(id) {   
    return peliculas.filter((pelicula) => { return (pelicula.id == id) })[0]
}

module.exports = {
    getPeliculas,
    getPeliculaById,
    getPeliculasSlider
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



